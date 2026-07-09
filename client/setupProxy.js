const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Only proxy API requests, not static assets
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      logLevel: 'debug',
      onError: (err, req, res) => {
        console.log('Proxy error:', err.message);
        res.status(500).json({ 
          error: 'Proxy error', 
          message: 'Backend server is not running. Please start it with: cd server && npm start' 
        });
      }
    })
  );
  
  // Don't proxy images or other static assets - they should be served from public folder
};

