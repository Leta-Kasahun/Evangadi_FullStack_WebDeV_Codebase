//thiis 

 const fristModule=require('./index');
// console.log(fristModule.converttoKm(20000));
// console.log(fristModule.converttomm(0.89))

// //use try catch to handle the zero divition error
// try{
//     console.log("trying to divide by zero");
//     let results=fristModule.divides(20,10);
//     console.log("the result is",results);
// }
// catch(error){
//     console.log('caught error',error.message);
// }


//this displays the catch block since there is errorn by zero divetion

try {
    console.log("trying to divide by zero");
    let results = fristModule.divides(20, 0);
    console.log("the result is", results);
}
catch (error) {
    console.log('caught error', error.message);
}
