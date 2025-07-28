// 1. Countdown timer
for (let i = 5; i >= 0; i--) console.log(`Countdown: ${i}`);

// 2. Shopping cart total
let prices = [5.99, 3.50, 12.75];
let total = 0;
for (let price of prices) total += price;
console.log(`Total: $${total.toFixed(2)}`);

// 3. Password attempts
let correctPin = "1234";
let attempts = 0;
while (attempts < 3) {
    attempts++;
    console.log(`Attempt ${attempts}`);
}

// 4. Reading notifications
let notifications = ["New message", "Friend request", "Like"];
notifications.forEach((note, index) => console.log(`${index + 1}. ${note}`));

// 5. Monthly savings tracker
let monthlySavings = [100, 150, 200, 50];
for (let i = 0; i < monthlySavings.length; i++) {
    console.log(`Month ${i + 1}: Saved $${monthlySavings[i]}`);
}

// 6. Temperature conversion
let celsiusTemps = [0, 25, 100];
for (let temp of celsiusTemps) {
    let fahrenheit = (temp * 9 / 5) + 32;
    console.log(`${temp}°C = ${fahrenheit}°F`);
}

// 7. FizzBuzz interview question
for (let i = 1; i <= 15; i++) {
    if (i % 15 === 0) console.log("FizzBuzz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
}

// 8. Processing user input
let userInput = "";
do {
    userInput = prompt("Enter 'quit' to exit");
} while (userInput !== "quit");

// 9. Generating multiplication table
let number = 7;
for (let i = 1; i <= 10; i++) {
    console.log(`${number} x ${i} = ${number * i}`);
}

// 10. Finding even numbers
let numbers = [1, 2, 3, 4, 5, 6];
for (let num of numbers) {
    if (num % 2 === 0) console.log(`${num} is even`);
}