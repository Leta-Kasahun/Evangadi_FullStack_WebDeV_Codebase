// 1. Basic Object
const person = {
    name: "Alex",
    age: 30,
    isEmployed: true
};
console.log(person.name);

// 2. Nested Object
const company = {
    name: "TechCorp",
    address: {
        city: "San Francisco",
        zip: 94107
    }
};
console.log(company.address.city);

// 3. Object with Methods
const calculator = {
    add: (a, b) => a + b,
    subtract(a, b) { return a - b; }
};
console.log(calculator.add(5, 3));

// 4. Object Destructuring (Basic)
const { name, age } = person;
console.log(name, age);

// 5. Nested Destructuring
const { address: { city } } = company;
console.log(city);

// 6. Destructuring in Function Parameters
const printUser = ({ name, age }) => {
    console.log(`${name} is ${age} years old`);
};
printUser(person);