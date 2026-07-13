/**
 * Firebase Cloud Function for Admin API Operations
 * Complete implementation with all admin operations
 * 
 * Endpoints:
 * - POST /api/admin/login - Admin authentication
 * - GET /api/content - Get all content
 * - GET /api/content/:section - Get specific section
 * - PUT /api/content/:section - Update entire section (requires auth)
 * - PUT /api/content/:section/:subsection - Update subsection (requires auth)
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sanitizeHtml = require('sanitize-html');
const crypto = require('crypto');
const path = require('path');
const cors = require('cors')({ origin: true });

// Seed content used the first time this function runs against a fresh
// Firestore project. Kept in sync with server/data/content.json (the local
// dev backend's content store) so both backends start from the same schema.
const defaultContentSeed = require('./default-content.json');

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

// Get Firestore database instance
const db = admin.firestore();

// ============================================================================
// CONFIGURATION
// ============================================================================

// Get configuration from Firebase Functions config or environment variables
// Priority: Firebase config > Environment variables > Default values
const ADMIN_PASSWORD = functions.config().admin?.password || 
                       process.env.ADMIN_PASSWORD || 
                       'admin123';

const ADMIN_TOKEN = functions.config().admin?.token || 
                    process.env.ADMIN_TOKEN || 
                    'admin-token-123';

// Firestore collection and document names
const CONTENT_COLLECTION = 'cms';
const CONTENT_DOCUMENT = 'content';
const BLOGS_COLLECTION = 'blogs';

// Sanitize any string found anywhere in a content payload before it's persisted.
// Content fields are edited as rich text (HTML) in the admin panel, so this strips
// scripts/handlers while keeping basic formatting and images/links. Kept in sync
// with the equivalent helper in server/server.js.
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

function sanitizeContent(value) {
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
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Read content from Firestore
 * @returns {Promise<Object>} Content object
 */
async function readContent() {
  try {
    const contentDoc = await db
      .collection(CONTENT_COLLECTION)
      .doc(CONTENT_DOCUMENT)
      .get();
    
    if (contentDoc.exists) {
      const data = contentDoc.data();
      console.log('Content read successfully from Firestore');
      return data;
    } else {
      // Seed Firestore with the full default content structure if this is a fresh project
      console.log('Content document not found, seeding default structure');
      await db
        .collection(CONTENT_COLLECTION)
        .doc(CONTENT_DOCUMENT)
        .set(defaultContentSeed);
      return defaultContentSeed;
    }
  } catch (error) {
    console.error('Error reading content from Firestore:', error);
    throw new Error(`Failed to read content: ${error.message}`);
  }
}

/**
 * Write content to Firestore
 * @param {Object} content - Content object to save
 * @returns {Promise<boolean>} Success status
 */
async function writeContent(content) {
  try {
    await db
      .collection(CONTENT_COLLECTION)
      .doc(CONTENT_DOCUMENT)
      .set(content, { merge: false });
    console.log('Content written successfully to Firestore');
    return true;
  } catch (error) {
    console.error('Error writing content to Firestore:', error);
    throw new Error(`Failed to write content: ${error.message}`);
  }
}

/**
 * Authenticate admin request using Bearer token
 * @param {Object} req - Express request object
 * @returns {boolean} Authentication status
 */
function authenticateAdmin(req) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log('No authorization header provided');
      return false;
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      console.log('Invalid authorization header format');
      return false;
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const isValid = token === ADMIN_TOKEN;
    
    if (!isValid) {
      console.log('Invalid token provided');
    }
    
    return isValid;
  } catch (error) {
    console.error('Error in authentication:', error);
    return false;
  }
}

/**
 * Parse URL path into array of path segments
 * @param {string} path - URL path
 * @returns {Array<string>} Array of path segments
 */
function parsePath(path) {
  if (!path) return [];
  
  // Remove query string and hash
  const cleanPath = path.split('?')[0].split('#')[0];
  
  // Split by '/' and filter out empty strings
  return cleanPath.split('/').filter(segment => segment.length > 0);
}

/**
 * Validate request body
 * @param {Object} body - Request body
 * @param {Array<string>} requiredFields - Required field names
 * @returns {Object} Validation result { valid: boolean, error: string }
 */
function validateRequestBody(body, requiredFields = []) {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body is required' };
  }
  
  for (const field of requiredFields) {
    if (!(field in body) || body[field] === null || body[field] === undefined) {
      return { valid: false, error: `Field '${field}' is required` };
    }
  }
  
  return { valid: true };
}

// ============================================================================
// ROUTE HANDLERS
// ============================================================================

/**
 * Handle admin login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleLogin(req, res) {
  try {
    const validation = validateRequestBody(req.body, ['password']);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }
    
    const { password } = req.body;
    
    if (password === ADMIN_PASSWORD) {
      console.log('Admin login successful');
      return res.status(200).json({
        token: ADMIN_TOKEN,
        message: 'Login successful'
      });
    } else {
      console.log('Admin login failed: Invalid password');
      return res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error in login handler:', error);
    return res.status(500).json({ error: 'Login failed', message: error.message });
  }
}

/**
 * Handle get all content
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleGetAllContent(req, res) {
  try {
    const content = await readContent();
    return res.status(200).json(content);
  } catch (error) {
    console.error('Error getting all content:', error);
    return res.status(500).json({ error: 'Failed to retrieve content', message: error.message });
  }
}

/**
 * Handle get specific section
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} section - Section name
 */
async function handleGetSection(req, res, section) {
  try {
    const content = await readContent();
    
    if (content[section]) {
      return res.status(200).json(content[section]);
    } else {
      return res.status(404).json({ 
        error: 'Section not found', 
        section: section,
        availableSections: Object.keys(content)
      });
    }
  } catch (error) {
    console.error(`Error getting section '${section}':`, error);
    return res.status(500).json({ error: 'Failed to retrieve section', message: error.message });
  }
}

/**
 * Handle update entire section
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} section - Section name
 */
async function handleUpdateSection(req, res, section) {
  try {
    if (!authenticateAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized. Valid Bearer token required.' });
    }
    
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Request body is required' });
    }
    
    const content = await readContent();
    content[section] = sanitizeContent(req.body);
    await writeContent(content);

    console.log(`Section '${section}' updated successfully`);
    return res.status(200).json({
      message: 'Content updated successfully',
      section: section,
      content: content[section]
    });
  } catch (error) {
    console.error(`Error updating section '${section}':`, error);
    return res.status(500).json({ error: 'Failed to update content', message: error.message });
  }
}

/**
 * Handle update subsection
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} section - Section name
 * @param {string} subsection - Subsection name
 */
async function handleUpdateSubsection(req, res, section, subsection) {
  try {
    if (!authenticateAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized. Valid Bearer token required.' });
    }
    
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Request body is required' });
    }
    
    const content = await readContent();
    
    // Create section if it doesn't exist
    if (!content[section]) {
      content[section] = {};
    }
    
    content[section][subsection] = sanitizeContent(req.body);
    await writeContent(content);

    console.log(`Subsection '${section}.${subsection}' updated successfully`);
    return res.status(200).json({
      message: 'Content updated successfully',
      section: section,
      subsection: subsection,
      content: content[section][subsection]
    });
  } catch (error) {
    console.error(`Error updating subsection '${section}.${subsection}':`, error);
    return res.status(500).json({ error: 'Failed to update content', message: error.message });
  }
}

// ============================================================================
// BLOG HANDLERS
// ============================================================================

/**
 * Generate slug from title
 * @param {string} title - Blog title
 * @returns {string} URL-friendly slug
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate read time from content
 * @param {string} content - Blog content
 * @returns {string} Read time estimate
 */
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Flattens a block-based blog body (see BlockRenderer on the client) down to
// plain text, for read-time estimation and default-excerpt generation.
// Image/video/slideshow blocks contribute no text.
function plainTextFromBlocks(blocks) {
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
}

/**
 * Handle get all blogs
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleGetAllBlogs(req, res) {
  try {
    let blogsSnapshot;
    
    // Try to order by date, fallback to simple get if index doesn't exist
    try {
      blogsSnapshot = await db.collection(BLOGS_COLLECTION)
        .orderBy('date', 'desc')
        .get();
    } catch (orderError) {
      // If ordering fails (e.g., no index), just get all blogs
      console.log('OrderBy failed, fetching without order:', orderError.message);
      blogsSnapshot = await db.collection(BLOGS_COLLECTION).get();
    }
    
    const blogs = [];
    blogsSnapshot.forEach(doc => {
      blogs.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort manually if orderBy failed
    if (blogs.length > 0) {
      blogs.sort((a, b) => {
        // First try to sort by date
        if (a.date && b.date) {
          return b.date.localeCompare(a.date);
        }
        // Fallback to createdAt timestamp
        if (a.createdAt && b.createdAt) {
          const timeA = a.createdAt.toMillis ? a.createdAt.toMillis() : (a.createdAt._seconds * 1000);
          const timeB = b.createdAt.toMillis ? b.createdAt.toMillis() : (b.createdAt._seconds * 1000);
          return timeB - timeA;
        }
        // Last resort: sort by ID
        return b.id.localeCompare(a.id);
      });
    }
    
    return res.status(200).json(blogs);
  } catch (error) {
    console.error('Error getting blogs:', error);
    return res.status(500).json({ error: 'Failed to retrieve blogs', message: error.message });
  }
}

/**
 * Handle get single blog
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} blogId - Blog ID
 */
async function handleGetBlog(req, res, blogId) {
  try {
    const blogDoc = await db.collection(BLOGS_COLLECTION).doc(blogId).get();
    
    if (!blogDoc.exists) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    return res.status(200).json({
      id: blogDoc.id,
      ...blogDoc.data()
    });
  } catch (error) {
    console.error(`Error getting blog '${blogId}':`, error);
    return res.status(500).json({ error: 'Failed to retrieve blog', message: error.message });
  }
}

/**
 * Handle create blog
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleCreateBlog(req, res) {
  try {
    if (!authenticateAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized. Valid Bearer token required.' });
    }
    
    const validation = validateRequestBody(req.body, ['title']);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const {
      title,
      subtitle = '',
      excerpt,
      content,
      contentBlocks,
      author = 'Venus Tech Team',
      category = 'AI & Technology',
      image = '',
      featured = false
    } = req.body;

    const hasBlocks = Array.isArray(contentBlocks) && contentBlocks.length > 0;
    if (!content && !hasBlocks) {
      return res.status(400).json({ error: "Either 'content' or 'contentBlocks' is required" });
    }

    // Generate slug if not provided
    const slug = req.body.slug || generateSlug(title);

    // Check if slug already exists
    const existingBlog = await db.collection(BLOGS_COLLECTION)
      .where('slug', '==', slug)
      .get();

    if (!existingBlog.empty) {
      return res.status(400).json({ error: 'A blog with this slug already exists' });
    }

    // Calculate read time
    const plainText = hasBlocks ? plainTextFromBlocks(contentBlocks) : content;
    const readTime = calculateReadTime(plainText);

    // Create blog data
    const blogData = {
      title: sanitizeHtml(title, SANITIZE_OPTIONS),
      subtitle: sanitizeHtml(subtitle, SANITIZE_OPTIONS),
      excerpt: sanitizeHtml(excerpt || plainText.substring(0, 150) + '...', SANITIZE_OPTIONS),
      content: content ? sanitizeHtml(content, SANITIZE_OPTIONS) : '',
      contentBlocks: hasBlocks ? sanitizeContent(contentBlocks) : [],
      author,
      category,
      image,
      imageFit: req.body.imageFit === 'contain' ? 'contain' : 'cover',
      featured: Boolean(featured),
      metaTitle: sanitizePlainText(req.body.metaTitle),
      metaDescription: sanitizePlainText(req.body.metaDescription),
      faq: Array.isArray(req.body.faq) ? sanitizeContent(req.body.faq) : [],
      slug,
      readTime,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Add to Firestore
    const docRef = await db.collection(BLOGS_COLLECTION).add(blogData);
    
    console.log(`Blog created successfully with ID: ${docRef.id}`);
    return res.status(201).json({
      message: 'Blog created successfully',
      id: docRef.id,
      blog: {
        id: docRef.id,
        ...blogData
      }
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({ error: 'Failed to create blog', message: error.message });
  }
}

/**
 * Handle update blog
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} blogId - Blog ID
 */
async function handleUpdateBlog(req, res, blogId) {
  try {
    if (!authenticateAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized. Valid Bearer token required.' });
    }
    
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Request body is required' });
    }
    
    // Check if blog exists
    const blogDoc = await db.collection(BLOGS_COLLECTION).doc(blogId).get();
    if (!blogDoc.exists) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    const updateData = sanitizeContent({ ...req.body });

    // If title or content changed, update slug and readTime
    if (updateData.title && updateData.title !== blogDoc.data().title) {
      updateData.slug = generateSlug(updateData.title);
    }

    if (Array.isArray(updateData.contentBlocks) && updateData.contentBlocks.length > 0) {
      updateData.readTime = calculateReadTime(plainTextFromBlocks(updateData.contentBlocks));
    } else if (updateData.content) {
      updateData.readTime = calculateReadTime(updateData.content);
    }

    // Add updated timestamp
    updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    
    // Update blog
    await db.collection(BLOGS_COLLECTION).doc(blogId).update(updateData);
    
    // Get updated blog
    const updatedBlog = await db.collection(BLOGS_COLLECTION).doc(blogId).get();
    
    console.log(`Blog '${blogId}' updated successfully`);
    return res.status(200).json({
      message: 'Blog updated successfully',
      id: blogId,
      blog: {
        id: updatedBlog.id,
        ...updatedBlog.data()
      }
    });
  } catch (error) {
    console.error(`Error updating blog '${blogId}':`, error);
    return res.status(500).json({ error: 'Failed to update blog', message: error.message });
  }
}

/**
 * Handle delete blog
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} blogId - Blog ID
 */
async function handleDeleteBlog(req, res, blogId) {
  try {
    if (!authenticateAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized. Valid Bearer token required.' });
    }
    
    // Check if blog exists
    const blogDoc = await db.collection(BLOGS_COLLECTION).doc(blogId).get();
    if (!blogDoc.exists) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Delete blog
    await db.collection(BLOGS_COLLECTION).doc(blogId).delete();
    
    console.log(`Blog '${blogId}' deleted successfully`);
    return res.status(200).json({
      message: 'Blog deleted successfully',
      id: blogId
    });
  } catch (error) {
    console.error(`Error deleting blog '${blogId}':`, error);
    return res.status(500).json({ error: 'Failed to delete blog', message: error.message });
  }
}

// ============================================================================
// UPLOAD HANDLER
// ============================================================================

/**
 * Handle image upload. Accepts a base64-encoded file (not multipart, since this
 * is a raw HTTP function, not an Express app) and stores it in the default
 * Firebase Storage bucket, returning its public URL.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleUploadImage(req, res) {
  try {
    if (!authenticateAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized. Valid Bearer token required.' });
    }

    const validation = validateRequestBody(req.body, ['filename', 'mimeType', 'dataBase64']);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { filename, mimeType, dataBase64 } = req.body;
    if (!mimeType.startsWith('image/')) {
      return res.status(400).json({ error: 'Only image uploads are allowed' });
    }

    const ext = path.extname(filename).replace(/[^a-zA-Z0-9.]/g, '') || '.bin';
    const objectName = `uploads/${Date.now()}-${crypto.randomUUID()}${ext}`;
    const buffer = Buffer.from(dataBase64, 'base64');

    const bucket = admin.storage().bucket();
    const file = bucket.file(objectName);
    await file.save(buffer, { metadata: { contentType: mimeType } });
    await file.makePublic();

    const url = `https://storage.googleapis.com/${bucket.name}/${objectName}`;
    return res.status(201).json({ url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Failed to upload file', message: error.message });
  }
}

// ============================================================================
// MAIN FIREBASE FUNCTION
// ============================================================================

/**
 * Main Firebase Cloud Function
 * Handles all admin API routes
 */
exports.adminApi = functions.https.onRequest(async (req, res) => {
  // Enable CORS for all requests
  cors(req, res, async () => {
    try {
      const { method } = req;
      const pathParts = parsePath(req.path || req.url);
      
      // Log request for debugging
      console.log(`[${method}] ${req.path || req.url}`, {
        pathParts: pathParts,
        hasBody: !!req.body,
        hasAuth: !!req.headers.authorization
      });
      
      // ========================================================================
      // ROUTING
      // ========================================================================
      
      // Route: POST /api/admin/login
      if (method === 'POST' && 
          pathParts.length === 3 &&
          pathParts[0] === 'api' && 
          pathParts[1] === 'admin' && 
          pathParts[2] === 'login') {
        return await handleLogin(req, res);
      }
      
      // Route: GET /api/content
      if (method === 'GET' && 
          pathParts.length === 2 &&
          pathParts[0] === 'api' && 
          pathParts[1] === 'content') {
        return await handleGetAllContent(req, res);
      }
      
      // Route: GET /api/content/:section
      if (method === 'GET' && 
          pathParts.length === 3 &&
          pathParts[0] === 'api' && 
          pathParts[1] === 'content') {
        const section = pathParts[2];
        return await handleGetSection(req, res, section);
      }
      
      // Route: PUT /api/content/:section
      if (method === 'PUT' && 
          pathParts.length === 3 &&
          pathParts[0] === 'api' && 
          pathParts[1] === 'content') {
        const section = pathParts[2];
        return await handleUpdateSection(req, res, section);
      }
      
      // Route: PUT /api/content/:section/:subsection
      if (method === 'PUT' && 
          pathParts.length === 4 &&
          pathParts[0] === 'api' && 
          pathParts[1] === 'content') {
        const section = pathParts[2];
        const subsection = pathParts[3];
        return await handleUpdateSubsection(req, res, section, subsection);
      }
      
      // ========================================================================
      // BLOG ROUTES
      // ========================================================================
      
      // Route: GET /api/blogs
      if (method === 'GET' && 
          pathParts.length === 2 &&
          pathParts[0] === 'api' && 
          pathParts[1] === 'blogs') {
        return await handleGetAllBlogs(req, res);
      }
      
      // Route: GET /api/blogs/:id
      if (method === 'GET' && 
          pathParts.length === 3 &&
          pathParts[0] === 'api' && 
          pathParts[1] === 'blogs') {
        const blogId = pathParts[2];
        return await handleGetBlog(req, res, blogId);
      }
      
      // Route: POST /api/blogs
      if (method === 'POST' && 
          pathParts.length === 2 &&
          pathParts[0] === 'api' && 
          pathParts[1] === 'blogs') {
        return await handleCreateBlog(req, res);
      }
      
      // Route: PUT /api/blogs/:id
      if (method === 'PUT' && 
          pathParts.length === 3 &&
          pathParts[0] === 'api' && 
          pathParts[1] === 'blogs') {
        const blogId = pathParts[2];
        return await handleUpdateBlog(req, res, blogId);
      }
      
      // Route: DELETE /api/blogs/:id
      if (method === 'DELETE' && 
          pathParts.length === 3 &&
          pathParts[0] === 'api' && 
          pathParts[1] === 'blogs') {
        const blogId = pathParts[2];
        return await handleDeleteBlog(req, res, blogId);
      }
      
      // Route: POST /api/upload
      if (method === 'POST' &&
          pathParts.length === 2 &&
          pathParts[0] === 'api' &&
          pathParts[1] === 'upload') {
        return await handleUploadImage(req, res);
      }

      // ========================================================================
      // 404 - Route not found
      // ========================================================================

      console.log(`Route not found: ${method} ${req.path || req.url}`);
      return res.status(404).json({
        error: 'Route not found',
        method: method,
        path: req.path || req.url,
        availableRoutes: [
          'POST /api/admin/login',
          'GET /api/content',
          'GET /api/content/:section',
          'PUT /api/content/:section (requires auth)',
          'PUT /api/content/:section/:subsection (requires auth)',
          'GET /api/blogs',
          'GET /api/blogs/:id',
          'POST /api/blogs (requires auth)',
          'PUT /api/blogs/:id (requires auth)',
          'DELETE /api/blogs/:id (requires auth)',
          'POST /api/upload (requires auth)'
        ]
      });
      
    } catch (error) {
      // Global error handler
      console.error('Unhandled error in admin API:', error);
      return res.status(500).json({ 
        error: 'Internal server error', 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });
});
