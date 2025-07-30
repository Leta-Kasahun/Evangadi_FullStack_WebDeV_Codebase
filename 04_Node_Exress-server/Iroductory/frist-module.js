let number1,numb2;
numbeconr1=300;
number2=600;
function sum(){
    console.log(`the sum of ${number1} and ${numb2} is ${number1+numb2}`);
}
//there are two methods to exports by using commen js module.exports or es6 stanadads export default
module.exports.sum=sum;