let fulltName="Abebe Kebede";
let age=23;
let salary=10000;
let address="AA, Ethiopia";
function showEmpInfo(){
    console.assert.log("this from module1")
    console.log(`Name: ${fulltName}\nAddress: ${address}\nAge: ${age}\n Salary: ${salary}`);
}


module.exports.displayEmpInfo=showEmpInfo;