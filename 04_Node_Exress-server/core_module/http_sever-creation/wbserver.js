const http=require("http");
 console.log(http);

// //createServer() turns comptor in to http server and it create the server objects

// const server=http.createServer(function(req,res){
//     console.log("requet resived");
//     res.end("hi there");
// })
// server.listen(777,function(){
//     console.log("it is listning on port 777");
// })

// const myServer=http.createServer((req,res)=>{
//     // console.log(req);
//     // console.log(res);
//     res.write("hellow server is creted");
//     res.end("respose is finished");
// })
// myServer.listen(1234,()=>{
//     console.log("server is running on port 1234");
// })


const server2=http.createServer((req,res)=>{
    if(req.url==""){
    res.write("<h1>this is about home page</h1>");
    res.end();}
    else if(req.url=="/about"){
        res.write("<h1>this is about page");
        res.end();
    }
    else {
        res.write("page not found");
        res.end();}
})
const port=2345;
server2.listen(port,()=>{
    console.log(`server is running on port  ${ port}`);
})

server2.on("error",()=>{
    console.log("error is happed");
})