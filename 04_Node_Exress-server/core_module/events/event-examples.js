const EventEmitter = require('events');
const emitter = new EventEmitter();

// 1. Basic user login event
emitter.on('login', (user) => {
    console.log(` ${user} just logged in!`);
});
emitter.emit('login', 'Leta');

// 2. File uploaded notification
emitter.on('fileUploaded', (fileName) => {
    console.log(` File uploaded: ${fileName}`);
});
emitter.emit('fileUploaded', 'resume.pdf');

// 3. Chat message received
emitter.on('chat', (msg) => {
    console.log(` New message: ${msg}`);
});
emitter.emit('chat', 'Hello, this is Leta!');

// 4. Order processing
emitter.on('orderPlaced', (orderId, total) => {
    console.log(` Order #${orderId} placed. Total: $${total}`);
});
emitter.emit('orderPlaced', 1023, 49.99);

// 5. System error handling
emitter.on('error', (err) => {
    console.error(` System Error: ${err.message}`);
});
emitter.emit('error', new Error('Server crashed'));

// 6. One-time welcome event
emitter.once('welcome', () => {
    console.log(' Welcome to our platform!');
});
emitter.emit('welcome');
emitter.emit('welcome'); // This won't run again
