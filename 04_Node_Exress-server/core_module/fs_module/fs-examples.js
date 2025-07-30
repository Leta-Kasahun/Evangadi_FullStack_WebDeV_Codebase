const fs = require('fs');
const path = require('path');

// 1. Write a file
//fs.writeFileSync('note.txt', 'This is a note.');

// 2. Read a file
const data = fs.readFileSync('note.txt', 'utf8');
console.log('File content:', data);

// 3. Append data to a file
fs.appendFileSync('note.txt', '\nAppended text.');

// 4. Delete a file
// fs.unlinkSync('note.txt');

// 5. Create a directory
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

// 6. Write logs to a file
fs.appendFileSync('logs/app.log', 'Server started at ' + new Date() + '\n');

// 7. Read directory contents
const files = fs.readdirSync('.');
console.log('Current directory files:', files);

// 8. Copy a file
fs.copyFileSync('note.txt', 'note-copy.txt');

// 9. Rename a file
fs.renameSync('note-copy.txt', 'note-renamed.txt');

// 10. Watch file changes
fs.watchFile('note.txt', () => {
    console.log('note.txt was modified!');
});
