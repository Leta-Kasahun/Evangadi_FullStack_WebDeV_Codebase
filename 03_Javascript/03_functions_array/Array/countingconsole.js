const arr=[12,34,56,78,56,44]
arr.forEach((num)=>console.count(num));

const fruits=['apple','mango','avocado','cherry','apple','apple','avocado','mango','mango','apple'];
// fruits.forEach((frt)=>console.count(frt));
let capitalized=  fruits.map((frt)=>frt[0].toUpperCase()+frt.slice(1));
capitalized.forEach((frt)=>console.log(frt));