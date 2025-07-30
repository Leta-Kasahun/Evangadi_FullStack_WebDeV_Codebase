const fs = require('fs');
const path = require('path');

// 1. Create nested directories
const nestedDir = path.join(__dirname, 'backup', '2025', 'July');
fs.mkdirSync(nestedDir, { recursive: true });
console.log('Nested folders created:', nestedDir);

// 2. Move (rename) a file to another folder
const oldPath = 'note.txt';
const newPath = path.join(nestedDir, 'note-backup.txt');
if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log('File moved to backup folder');
}

// 3. Create a file with today's date in the name
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(`log-${today}.txt`, 'Daily log entry');

// 4. Recursively list all files in a directory
function listFilesRecursively(dirPath) {
    fs.readdirSync(dirPath).forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            listFilesRecursively(fullPath);
        } else {
            console.log('File:', fullPath);
        }
    });
}
listFilesRecursively(__dirname);

// 5. Write JSON data to a file
const user = { name: 'Leta', role: 'Developer', joined: 2025 };
fs.writeFileSync('user.json', JSON.stringify(user, null, 2));

// 6. Read JSON file and parse it
const rawData = fs.readFileSync('user.json');
const parsedUser = JSON.parse(rawData);
console.log('User loaded:', parsedUser);

// 7. Append multiple lines of log entries
const logStream = fs.createWriteStream('multi-line.log', { flags: 'a' });
for (let i = 1; i <= 3; i++) {
    logStream.write(`Log entry ${i} at ${new Date().toLocaleTimeString()}\n`);
}
logStream.end();

// 8. Monitor a folder for changes
fs.watch('logs', (eventType, filename) => {
    console.log(`File ${filename} was ${eventType}`);
});

// 9. Check if a file exists before reading
const configPath = 'config.json';
if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, 'utf8');
    console.log('Config:', config);
} else {
    console.log('Config file not found.');
}

// 10. Delete all files inside a folder
function clearFolder(folderPath) {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        if (fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
        }
    }
    console.log('Folder cleared:', folderPath);
}
clearFolder('logs');
