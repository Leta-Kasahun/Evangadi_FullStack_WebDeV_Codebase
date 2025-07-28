// 1. Age check for voting
let age = 18;
if (age >= 18) console.log("You can vote!");

// 2. Login authentication
let username = "admin";
let password = "12345";
if (username === "admin" && password === "12345") console.log("Access granted");

// 3. Discount eligibility
let isMember = true;
if (isMember) console.log("You get 10% discount!");

// 4. Traffic light system
let light = "green";
if (light === "red") console.log("Stop!");
else if (light === "yellow") console.log("Slow down");
else console.log("Go!");

// 5. Grade calculator
let score = 85;
if (score >= 90) console.log("A");
else if (score >= 80) console.log("B");
else if (score >= 70) console.log("C");
else console.log("Failed");

// 6. Empty cart check
let cartItems = 0;
if (!cartItems) console.log("Your cart is empty");

// 7. Shipping fee based on location
let country = "US";
let shippingFee = country === "US" ? 5 : 15;
console.log(`Shipping fee: $${shippingFee}`);

// 8. Movie age restriction
let movieRating = "PG-13";
let viewerAge = 15;
if (movieRating === "R" && viewerAge < 18) console.log("Access denied");

// 9. Weather clothing suggestion
let temperature = 12;
if (temperature < 10) console.log("Wear a jacket");
else if (temperature < 20) console.log("Wear a sweater");
else console.log("T-shirt is fine");

// 10. Bank withdrawal limit
let balance = 500;
let withdrawal = 600;
if (withdrawal > balance) console.log("Insufficient funds");