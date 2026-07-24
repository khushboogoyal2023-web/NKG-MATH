#!/usr/bin/env node

// GitHub Pages automatic build and deploy script

const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  console.log('📁 Creating dist directory...');
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('✅ Setup complete!');
console.log('🚀 Ready for GitHub Pages deployment');
