const path=require('path');
// //file name
// console.log("Directory Nane:",path.dirname(__dirname))
// console.log("File name:",path.basename(__filename));
// //file extensition
console.log("extension name:",path.extname(__filename));
//join path
const joinedpath=path.join("./users","document","soft","node");
console.log("joined path:",joinedpath);