//exporting function in mudule
function addTwoNum(){
    let  num1=20;
    let num2=60;
    console.log(`result: ${num1} + ${num2}= ${num2+num2}`);
    console.log("this is from testing module file");
}
module.exports.sum=addTwoNum;