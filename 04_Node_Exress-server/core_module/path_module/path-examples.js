const path = require('path');

// 1. Get the current file name
console.log('1. File Name:', path.basename(__filename));

// 2. Get the current directory
console.log('2. Directory Name:', path.dirname(__filename));

// 3. Get the file extension
console.log('3. File Extension:', path.extname(__filename));

// 4. Join paths safely (cross-platform)
const fullPath = path.join(__dirname, 'public', 'assets', 'image.png');
console.log('4. Joined Path:', fullPath);

// 5. Resolve absolute path
const resolvedPath = path.resolve('logs', 'today.log');
console.log('5. Resolved Absolute Path:', resolvedPath);

// 6. Parse path details (object)
const parsed = path.parse(__filename);
console.log('6. Parsed Path Object:', parsed);
