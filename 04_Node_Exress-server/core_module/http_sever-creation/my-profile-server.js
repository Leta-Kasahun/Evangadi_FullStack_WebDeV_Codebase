const http=require('http');
const path=require('path');
const mimeTypes=require('mime-types').lookup;//this is used to identifies the file type according to the req url type of file 
const fs=require('fs');
const port=process.env.PORT||4000;
const myProfileServer=http.createServer((req,res)=>{
    const filePath=path.join(__dirname,'my-profile','index.html');
   fs.readFile(filePath,(error,content)=>{
    if(error)throw error;
    res.writeHead(200,{'content-type':mimeTypes(filePath)});
    res.end(content);
   })
})
//starts my server
myProfileServer.listen(port,()=>console.log(`sever is running on http://localhost:${port} domain`));