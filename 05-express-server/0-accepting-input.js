// const readline = require('node:readline/promises');
// const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// async function main() {
//     const a = Number(await rl.question('Enter a number: '));
//     const b = Number(await rl.question('Enter another number: '));
//     console.log(`${a} + ${b} =`, a + b);
//     rl.close();
// }

// main();

//syncrones ways
const prompt=require('prompt-sync');
const name=prompt('Name:   ');
console.log('hellow',name);

