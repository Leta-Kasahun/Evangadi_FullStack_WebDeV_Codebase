const http=require('http');
const myServer=http.createServer((req,res)=>{
    //  console.log(res,req);
    res.writeHead(200,{"Content-type" : "text/plain"});
    res.end("hellow node js from http module");

});
const port=2000;
myServer.listen(port,()=>console.log(`server is now listnening to port  ${port}`));
