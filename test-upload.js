const fs = require('fs');
const path = require('path');

// Create a simple test file
const testContent = 'This is a test file for upload testing';
fs.writeFileSync('test-upload.txt', testContent);

console.log('Test file created. Now you can test the upload functionality through the admin panel.');