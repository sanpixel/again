const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const serveIndex = require('serve-index');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Debug: Check if frontend build exists
const buildPath = path.join(__dirname, '../frontend/build');
console.log('Build path:', buildPath);
console.log('Build directory exists:', fs.existsSync(buildPath));
if (fs.existsSync(buildPath)) {
  const files = fs.readdirSync(buildPath);
  console.log('Build files:', files);
} else {
  console.log('Build directory does not exist');
}

app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'again', port: PORT });
});

// Config endpoint for frontend to get Supabase settings at runtime
app.get('/api/config', (req, res) => {
  res.json({
    supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
    supabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
    siteUrl: process.env.REACT_APP_SITE_URL || `http://localhost:${PORT}`
  });
});

// Debug endpoint to check .env file content
app.get('/api/debug/env', (req, res) => {
  const envPath = path.join(__dirname, '../frontend/.env');
  const exists = fs.existsSync(envPath);
  
  if (exists) {
    const content = fs.readFileSync(envPath, 'utf8');
    res.json({ 
      exists: true, 
      content: content,
      lines: content.split('\n').filter(line => line.trim())
    });
  } else {
    res.json({ 
      exists: false, 
      content: null,
      processEnv: {
        REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL || 'undefined',
        REACT_APP_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || 'undefined',
        REACT_APP_SITE_URL: process.env.REACT_APP_SITE_URL || 'undefined'
      }
    });
  }
});

// File browser for debugging - serves directory listing
app.use('/files', express.static(path.join(__dirname, '..')), serveIndex(path.join(__dirname, '..'), {'icons': true}));

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
