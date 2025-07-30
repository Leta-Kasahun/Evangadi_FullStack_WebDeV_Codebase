const EventEmitter = require('events');
const emitter = new EventEmitter();

// 1. User logout event
emitter.on('logout', (username) => {
    console.log(`👋 ${username} has logged out.`);
});
emitter.emit('logout', 'Leta');

// 2. Data saved event
emitter.on('dataSaved', (collection, id) => {
    console.log(`💾 Data saved in "${collection}" with ID: ${id}`);
});
emitter.emit('dataSaved', 'users', 101);

// 3. Email sent event
emitter.on('emailSent', (to, subject) => {
    console.log(`📧 Email sent to ${to} with subject "${subject}"`);
});
emitter.emit('emailSent', 'leta@example.com', 'Welcome Aboard!');

// 4. Payment success event
emitter.on('paymentSuccess', (user, amount) => {
    console.log(`💰 ${user} paid $${amount} successfully.`);
});
emitter.emit('paymentSuccess', 'Leta', 99.99);

// 5. Download complete event
emitter.on('downloadComplete', (filename) => {
    console.log(`✅ Download finished: ${filename}`);
});
emitter.emit('downloadComplete', 'project.zip');

// 6. Server shutdown event
emitter.on('shutdown', () => {
    console.log('🛑 Server is shutting down...');
});
emitter.emit('shutdown');

// 7. User registration event
emitter.on('registered', (user) => {
    console.log(`🙋 New user registered: ${user}`);
});
emitter.emit('registered', 'Leta Kasahun');

// 8. Inventory alert event
emitter.on('lowStock', (item, qty) => {
    console.log(`⚠️ Low stock alert for ${item}. Only ${qty} left.`);
});
emitter.emit('lowStock', 'Laptop', 3);
