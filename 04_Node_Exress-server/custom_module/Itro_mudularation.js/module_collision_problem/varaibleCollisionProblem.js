
// //this is error dueto the namespace problem
// let var1=200;
// function displayVar1(){
//     console.log(`the value os var1 is ${var1}`);

// }
// let var1=300;

// function displayNumbers(){
//     console.log(`the vlaue of number is ${var1}`);

// }
// displayNumbers();
// displayVar1();

//solution is wraping al in function 
function displayVar1(){
    let var1=200;
    console.log(`the value os var1 is ${var1}`);

}

function displayNumbers(){
    let var1=300;
    console.log(`the vlaue of number is ${var1}`);
}
displayNumbers();
displayVar1();
