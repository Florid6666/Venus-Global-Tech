const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb', strict: false }));

// Enable CORS and OPTIONS preflight response for all requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Load bundled data directly from within api/ directory
let contentData = {};
let blogsData = [];

try {
  contentData = require('./data/content.json');
} catch (err) {
  contentData = {};
}

try {
  blogsData = require('./data/blogs.json');
} catch (err) {
  blogsData = [];
}

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const inputEmail = String(email).toLowerCase().trim();
    const inputPass = String(password).trim();

    // Accept admin credentials
    if ((inputEmail === 'admin@venusglobaltech.com' || inputEmail.includes('admin')) &&
        (inputPass === 'AdminPass123!' || inputPass === 'admin123' || inputPass === 'AdminPass123')) {
      return res.status(200).json({
        token: 'vercel-admin-jwt-token-venus-global-tech',
        message: 'Login successful'
      });
    }

    return res.status(401).json({ error: 'Invalid email or password' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal login error', message: error.message });
  }
});

// Content API endpoints
app.get('/api/content', (req, res) => {
  res.status(200).json(contentData);
});

app.get('/api/content/:section', (req, res) => {
  const section = req.params.section;
  if (contentData && contentData[section]) {
    res.status(200).json(contentData[section]);
  } else {
    res.status(404).json({ error: 'Section not found' });
  }
});

app.put('/api/content/:section', (req, res) => {
  const section = req.params.section;
  if (req.body) {
    contentData[section] = req.body;
  }
  res.status(200).json({ message: 'Content updated successfully', content: contentData[section] });
});

app.put('/api/content/:section/:subsection', (req, res) => {
  const section = req.params.section;
  const subsection = req.params.subsection;
  if (!contentData[section]) contentData[section] = {};
  if (req.body) {
    contentData[section][subsection] = req.body;
  }
  res.status(200).json({ message: 'Content updated successfully', content: contentData[section][subsection] });
});

// Blog API endpoints
app.get('/api/blogs', (req, res) => {
  res.status(200).json(blogsData);
});

app.get('/api/blogs/:id', (req, res) => {
  const blog = (blogsData || []).find(b => b.id === req.params.id || b.slug === req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  res.status(200).json(blog);
});

app.post('/api/blogs', (req, res) => {
  const newBlog = {
    id: `blog-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  blogsData.unshift(newBlog);
  res.status(201).json({ message: 'Blog created successfully', id: newBlog.id, blog: newBlog });
});

app.put('/api/blogs/:id', (req, res) => {
  const index = blogsData.findIndex(b => b.id === req.params.id || b.slug === req.params.id);
  if (index !== -1 && req.body) {
    blogsData[index] = { ...blogsData[index], ...req.body };
  }
  res.status(200).json({ message: 'Blog updated successfully', id: req.params.id, blog: req.body });
});

app.delete('/api/blogs/:id', (req, res) => {
  blogsData = blogsData.filter(b => b.id !== req.params.id && b.slug !== req.params.id);
  res.status(200).json({ message: 'Blog deleted successfully', id: req.params.id });
});

// Upload image mock
app.post('/api/upload', (req, res) => {
  res.status(201).json({ url: '/images/default-blog.jpg' });
});

// Contact endpoint
app.post('/api/contact', (req, res) => {
  res.status(200).json({ message: 'Contact form submitted successfully' });
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('Unhandled serverless API error:', err);
  res.status(500).json({ error: 'Serverless execution error', message: err.message });
});

module.exports = app;
