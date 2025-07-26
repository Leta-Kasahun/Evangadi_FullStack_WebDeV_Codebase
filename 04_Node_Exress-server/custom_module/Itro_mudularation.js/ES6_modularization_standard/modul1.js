let num1,num2;
num2=40;
num1=30;
function multply(){
    console.log(`${num1} * ${num2}= ${num1 * num2}`)
}
function divid() {
    console.log(`${num1} / ${num2}= ${num1 / num2}`)
}
function add() {
    console.log(`${num1} + ${num2}= ${num1 + num2}`)
}
//exporting default is possible to rename and written without curlbrase
export default add;
//exporting with difualt can not be renamed and written with curlbrase
export {multply,divid};