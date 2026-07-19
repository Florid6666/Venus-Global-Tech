const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs').promises;
const sanitizeHtml = require('sanitize-html');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
// Railway sets PORT automatically (default 3000 for this service). Keep 3000
// as the local fallback so behavior matches Railway's standard.
const PORT = process.env.PORT || 3000;

// Middleware
// In production, the built React app and this API are served from the same
// Railway service/domain, so browser requests are same-origin and CORS
// headers are irrelevant to them in practice. CORS still matters for local
// development, where the CRA dev server (localhost:3000) talks to this API
// on a different port (5000/3000 conflicts, proxying, etc). Reflecting the
// request's Origin (instead of a bare `*`) lets `credentials: true` work
// safely for any origin, including whatever domain this service ends up
// being reached at on Railway.
const corsOptions = {
  origin: (origin, callback) => callback(null, origin || true),
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
// Serve React app from client build (if built)
const buildPath = path.join(__dirname, '..', 'client', 'build');
if (require('fs').existsSync(buildPath)) {
  app.use(express.static(buildPath));
}

// Uploaded images (from the admin panel's rich text editor / image fields)
// Lives under data/ so it's covered by the same persistent Railway Volume as
// content.json/blogs.json/admin.json — uploads used to be wiped on every
// redeploy since /app/server/uploads wasn't on the volume.
const UPLOADS_DIR = path.join(__dirname, 'data', 'uploads');
require('fs').mkdirSync(UPLOADS_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOADS_DIR));

// Content file path
const CONTENT_FILE = path.join(__dirname, 'data', 'content.json');
const BLOGS_FILE = path.join(__dirname, 'data', 'blogs.json');
const ADMIN_FILE = path.join(__dirname, 'data', 'admin.json');

// Signs/verifies admin login tokens. Must be set to a stable secret in
// production (Railway env var) — falling back to a random value means every
// admin gets logged out whenever the process restarts/redeploys.
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.JWT_SECRET) {
  console.log('JWT_SECRET not set - using a random secret for this process only. Set JWT_SECRET in production so admin sessions survive restarts.');
}
const JWT_EXPIRY = '7d';

// Admin credentials: { email, passwordHash } stored on disk, bcrypt-hashed.
// Bootstrapped from ADMIN_EMAIL/ADMIN_PASSWORD on first run if admin.json
// doesn't exist yet (see ensureAdminBootstrap below); rotate afterwards with
// `npm run set-admin -- <email> <password>` in server/.
const readAdmin = async () => {
  try {
    const data = await fs.readFile(ADMIN_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
};

const ensureAdminBootstrap = async () => {
  const existing = await readAdmin();
  if (existing) return;

  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log('No admin account found and ADMIN_EMAIL/ADMIN_PASSWORD are not set - admin login is disabled until you set those env vars (first run only) or run `npm run set-admin -- <email> <password>` in server/.');
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await fs.mkdir(path.dirname(ADMIN_FILE), { recursive: true });
  await fs.writeFile(ADMIN_FILE, JSON.stringify({ email: ADMIN_EMAIL.toLowerCase(), passwordHash }, null, 2), 'utf8');
  console.log(`Bootstrapped admin account for ${ADMIN_EMAIL} from ADMIN_EMAIL/ADMIN_PASSWORD.`);
};

// data/ is where CONTENT_FILE/BLOGS_FILE/ADMIN_FILE live, and in production
// that's expected to be a mounted Volume so edits survive redeploys. A fresh
// Volume mounts empty, which shadows whatever content.json/blogs.json shipped
// in the image at that path — so on first boot against an empty volume,
// seed it from data-seed/ (a copy baked into the image, outside the mount
// point) instead of leaving the site with no content to serve.
const seedFileIfMissing = async (targetFile, seedFile, label) => {
  try {
    await fs.access(targetFile);
    return;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  try {
    await fs.mkdir(path.dirname(targetFile), { recursive: true });
    await fs.copyFile(seedFile, targetFile);
    console.log(`Seeded ${label} from the committed default (first boot on this volume).`);
  } catch (seedError) {
    console.log(`No seed available for ${label}: ${seedError.message}`);
  }
};

const ensureDataBootstrap = async () => {
  await seedFileIfMissing(CONTENT_FILE, path.join(__dirname, 'data-seed', 'content.json'), 'content.json');
  await seedFileIfMissing(BLOGS_FILE, path.join(__dirname, 'data-seed', 'blogs.json'), 'blogs.json');
};

// JWT-based authentication middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.substring(7);
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Helper function to read content
const readContent = async () => {
  try {
    const data = await fs.readFile(CONTENT_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading content:', error);
    throw error;
  }
};

// Helper function to write content
const writeContent = async (content) => {
  try {
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing content:', error);
    throw error;
  }
};

// Sanitize any string found anywhere in a content payload before it's persisted.
// Content fields are edited as rich text (HTML) in the admin panel, so this strips
// scripts/handlers while keeping basic formatting and images/links.
const SANITIZE_OPTIONS = {
  allowedTags: ['b', 'i', 'em', 'strong', 'u', 's', 'p', 'br', 'span', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'blockquote', 'code', 'pre'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height'],
    span: ['style'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
};

// Only strings that actually contain HTML tags (i.e. came from a
// RichTextEditor field) get run through sanitizeHtml. Plain structural
// values (category, slug, date, icon classes, hex colors, URLs) never
// contain tags, so leaving them untouched avoids sanitizeHtml re-escaping
// literal characters like "&" on every save (which would otherwise
// compound with each edit and desync them from dropdown/select options).
const looksLikeHtml = (value) => /<[a-z][\s\S]*>/i.test(value);

// For fields that render as plain text in a non-HTML context (e.g. document
// title, a <meta content="..."> attribute) — strips all tags rather than
// just disallowed ones, since these can never legitimately contain markup.
const sanitizePlainText = (value) => sanitizeHtml(String(value || ''), { allowedTags: [], allowedAttributes: {} }).trim();

const sanitizeContent = (value) => {
  if (typeof value === 'string') {
    return looksLikeHtml(value) ? sanitizeHtml(value, SANITIZE_OPTIONS) : value;
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeContent);
  }
  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = sanitizeContent(val);
    }
    return result;
  }
  return value;
};

// Helper functions for blog storage (server/data/blogs.json — mirrors the
// Firestore-backed blogs collection used by the deployed cloud function)
const readBlogs = async () => {
  try {
    const data = await fs.readFile(BLOGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading blogs:', error);
    throw error;
  }
};

const writeBlogs = async (blogs) => {
  await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf8');
  return true;
};

const generateSlug = (title) => {
  return title
    // Title is CKEditor HTML (e.g. "<h2>My Title</h2>" if authored with a
    // heading format) — strip tags first, otherwise the surviving tag name
    // (h2, strong, ...) leaks into the slug as literal text, since letters
    // and digits pass the word-character filter below unchanged.
    .replace(/<[^>]+>/g, ' ')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

// Flattens a block-based blog body (see BlockRenderer on the client) down to
// plain text, for read-time estimation and default-excerpt generation.
// Image/video/slideshow blocks contribute no text.
const plainTextFromBlocks = (blocks) => {
  return (blocks || [])
    .map((block) => {
      switch (block.type) {
        case 'heading': return block.text || '';
        case 'paragraph': return (block.html || '').replace(/<[^>]+>/g, ' ');
        case 'legacy': return (block.html || '').replace(/<[^>]+>/g, ' ');
        case 'list': return (block.items || []).join(' ');
        case 'link': return block.text || '';
        default: return '';
      }
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Email configuration (optional - only if email credentials are provided)
let transporter = null;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (emailUser && emailPass && emailUser !== 'your-email@gmail.com' && emailPass !== 'your-app-password') {
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    // Verify email configuration
    transporter.verify((error, success) => {
      if (error) {
        console.log('Email configuration error:', error.message);
        console.log('Email functionality will be disabled');
      } else {
        console.log('Email server is ready to send messages');
      }
    });
  } catch (error) {
    console.log('Email configuration error:', error.message);
    console.log('Email functionality will be disabled');
  }
} else {
  console.log('Email not configured - contact form emails will be disabled');
}

// Disable caching for all API routes
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// Content Management API Endpoints

// Get all content
app.get('/api/content', async (req, res) => {
  try {
    const content = await readContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read content' });
  }
});

// Get specific content section
app.get('/api/content/:section', async (req, res) => {
  try {
    const content = await readContent();
    const section = req.params.section;
    if (content[section]) {
      res.json(content[section]);
    } else {
      res.status(404).json({ error: 'Section not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read content' });
  }
});

// Update content (requires authentication)
app.put('/api/content/:section', authenticateAdmin, async (req, res) => {
  try {
    const content = await readContent();
    const section = req.params.section;
    content[section] = sanitizeContent(req.body);
    await writeContent(content);
    res.json({ message: 'Content updated successfully', content: content[section] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Update nested content (e.g., home.hero)
app.put('/api/content/:section/:subsection', authenticateAdmin, async (req, res) => {
  try {
    const content = await readContent();
    const section = req.params.section;
    const subsection = req.params.subsection;
    if (!content[section]) {
      content[section] = {};
    }
    content[section][subsection] = sanitizeContent(req.body);
    await writeContent(content);
    res.json({ message: 'Content updated successfully', content: content[section][subsection] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Blog Management API Endpoints (mirrors server/cloud-functions/admin-api/index.js)

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await readBlogs();
    const sorted = [...blogs].sort((a, b) => {
      if (a.date && b.date) return b.date.localeCompare(a.date);
      return String(b.id).localeCompare(String(a.id));
    });
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blogs' });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blogs = await readBlogs();
    const blog = blogs.find((b) => b.id === req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog' });
  }
});

app.post('/api/blogs', authenticateAdmin, async (req, res) => {
  try {
    const { title, content, contentBlocks } = req.body;
    const hasBlocks = Array.isArray(contentBlocks) && contentBlocks.length > 0;
    if (!title || !(content || hasBlocks)) {
      return res.status(400).json({ error: "Field 'title' and either 'content' or 'contentBlocks' are required" });
    }

    const blogs = await readBlogs();
    const slug = req.body.slug || generateSlug(title);
    if (blogs.some((b) => b.slug === slug)) {
      return res.status(400).json({ error: 'A blog with this slug already exists' });
    }

    const plainText = hasBlocks ? plainTextFromBlocks(contentBlocks) : (content || '');
    const now = new Date().toISOString();
    const blog = {
      id: crypto.randomUUID(),
      title: sanitizeHtml(title, SANITIZE_OPTIONS),
      subtitle: sanitizeHtml(req.body.subtitle || '', SANITIZE_OPTIONS),
      excerpt: sanitizeHtml(req.body.excerpt || plainText.substring(0, 150) + '...', SANITIZE_OPTIONS),
      content: content ? sanitizeHtml(content, SANITIZE_OPTIONS) : '',
      contentBlocks: hasBlocks ? sanitizeContent(contentBlocks) : [],
      author: req.body.author || 'Venus Tech Team',
      category: req.body.category || 'AI & Technology',
      image: req.body.image || '',
      imageFit: req.body.imageFit === 'contain' ? 'contain' : 'cover',
      featured: Boolean(req.body.featured),
      metaTitle: sanitizePlainText(req.body.metaTitle),
      metaDescription: sanitizePlainText(req.body.metaDescription),
      faq: Array.isArray(req.body.faq) ? sanitizeContent(req.body.faq) : [],
      slug,
      readTime: calculateReadTime(plainText),
      date: req.body.date || now.split('T')[0],
      createdAt: now,
      updatedAt: now,
    };

    blogs.push(blog);
    await writeBlogs(blogs);
    res.status(201).json({ message: 'Blog created successfully', id: blog.id, blog });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

app.put('/api/blogs/:id', authenticateAdmin, async (req, res) => {
  try {
    const blogs = await readBlogs();
    const index = blogs.findIndex((b) => b.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const existing = blogs[index];
    const updateData = { ...req.body };
    if (updateData.title && updateData.title !== existing.title) {
      updateData.slug = generateSlug(updateData.title);
    }
    if (Array.isArray(updateData.contentBlocks) && updateData.contentBlocks.length > 0) {
      updateData.readTime = calculateReadTime(plainTextFromBlocks(updateData.contentBlocks));
    } else if (updateData.content) {
      updateData.readTime = calculateReadTime(updateData.content);
    }
    updateData.updatedAt = new Date().toISOString();

    const updated = sanitizeContent({ ...existing, ...updateData, id: existing.id });
    blogs[index] = updated;
    await writeBlogs(blogs);
    res.json({ message: 'Blog updated successfully', id: updated.id, blog: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

app.delete('/api/blogs/:id', authenticateAdmin, async (req, res) => {
  try {
    const blogs = await readBlogs();
    const index = blogs.findIndex((b) => b.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    blogs.splice(index, 1);
    await writeBlogs(blogs);
    res.json({ message: 'Blog deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// Image upload endpoint used by the admin panel (rich text editor + image fields).
// Accepts a base64-encoded file instead of multipart so the same request shape
// works against both this Express server and the raw Cloud Function handler.
app.post('/api/upload', authenticateAdmin, async (req, res) => {
  try {
    const { filename, mimeType, dataBase64 } = req.body;
    if (!filename || !mimeType || !dataBase64) {
      return res.status(400).json({ error: "Fields 'filename', 'mimeType' and 'dataBase64' are required" });
    }
    if (!mimeType.startsWith('image/')) {
      return res.status(400).json({ error: 'Only image uploads are allowed' });
    }

    const ext = path.extname(filename).replace(/[^a-zA-Z0-9.]/g, '') || '.bin';
    const safeName = `${Date.now()}-${crypto.randomUUID()}${ext}`;
    const buffer = Buffer.from(dataBase64, 'base64');
    await fs.writeFile(path.join(UPLOADS_DIR, safeName), buffer);

    // Relative, not absolute: req.protocol reports 'http' behind Railway's
    // TLS-terminating proxy (no `trust proxy` set), which produced broken
    // http:// URLs that browsers block as mixed content on the https:// site.
    const url = `/uploads/${safeName}`;
    res.status(201).json({ url });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await readAdmin();
    if (!admin) {
      return res.status(503).json({ error: 'No admin account is configured yet' });
    }

    const matches = admin.email === email.toLowerCase().trim() && await bcrypt.compare(password, admin.passwordHash);
    if (!matches) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: admin.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Change admin email/password. Requires the current password (not just a
// valid session token) so a leaked/stolen token alone can't lock the real
// admin out by rotating credentials to something else.
app.put('/api/admin/credentials', authenticateAdmin, async (req, res) => {
  try {
    const { currentPassword, email, password } = req.body;
    if (!currentPassword || !email || !password) {
      return res.status(400).json({ error: 'Current password, new email, and new password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }

    const admin = await readAdmin();
    if (!admin || !(await bcrypt.compare(currentPassword, admin.passwordHash))) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await fs.mkdir(path.dirname(ADMIN_FILE), { recursive: true });
    await fs.writeFile(ADMIN_FILE, JSON.stringify({ email: email.toLowerCase().trim(), passwordHash }, null, 2), 'utf8');
    res.json({ message: 'Admin credentials updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update credentials' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, budget, inquiry } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !budget || !inquiry) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if email is configured
    if (!transporter) {
      console.log('Contact form submission received but email is not configured:');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Phone:', phone);
      console.log('Budget:', budget);
      console.log('Inquiry:', inquiry);
      return res.status(200).json({ 
        message: 'Form submitted successfully (email not configured - check server logs)' 
      });
    }

    // Email content
    const mailOptions = {
      from: emailUser,
      to: process.env.RECIPIENT_EMAIL || emailUser,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Inquiry:</strong></p>
        <p>${inquiry.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from your website contact form.</em></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Serve React app (catch-all route must be last)
// Only serve index.html for non-API routes (only if build folder exists)
const clientBuildPath = path.join(__dirname, '..', 'client', 'build', 'index.html');
try {
  if (require('fs').existsSync(clientBuildPath)) {
    app.get(/^(?!\/api).*/, (req, res) => {
      res.sendFile(clientBuildPath);
    });
  }
} catch (error) {
  console.log('Client build folder not found - API server only mode');
}

Promise.all([ensureAdminBootstrap(), ensureDataBootstrap()])
  .catch((error) => console.error('Startup bootstrap failed:', error))
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
