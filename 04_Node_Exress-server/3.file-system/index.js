const fs=require('fs');
const path=require('path');
//craeting data folder for the file  opration
const dataFolder=path.join(__dirname,'data');
// try{
//     if(!fs.existsSync(dataFolder)){
//         fs.mkdirSync(dataFolder);
//         console.log("data folder is created successfully");
//     }
// }
// catch(error){
//     console.log(error.message())
// }
//craeting the file in the alraedy created data folder
// const filePath=path.join(dataFolder,'example.txt');
// fs.writeFileSync(filePath,"this is created by  file fs system in node core module to practicing file system");
// console.log("file is created");

// //reding the data contents that already created in the file
// const fileContent=fs.readFileSync(filePath,'utf8');
// console.log(fileContent);

// //append to the already created file with the file contents
// fs.appendFileSync(filePath,"\nthis is the file that appended now after the file is creted and the file pathis given");
// console.log("file is appedded successfuly");

//these the whole above example are  syc ways  the folling  file is oprated in asyncroness ways
const asyFilePath=path.join(dataFolder,'asy-file-example.txt');
//now writing the contents to the created file
fs.writeFile(asyFilePath,'This is the file that created in asycroness ways from node js',(err)=>{
    if(err)throw err;
    console.log("asyncroness file is created successfuly");

});

//reading the file contents from asyncroness file
// let readContents=fs.readFile(asyFilePath,'utf8',(error,data)=>{
//     if(error)throw error;
//     console.log("asyc file contents: ",data);
// })
//appending the contents to file asyc fiel
fs.appendFile(asyFilePath,"\n This is the file appended to the asyc file contents",(err)=>{
    if(err)throw err;
    console.log("asynct file contents is appended succesfully");
})