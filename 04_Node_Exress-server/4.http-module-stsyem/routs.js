const http=require('http');
const myrouts=http.createServer((req,res)=>{
    const url=req.url;
    if(url==="/"){
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("this is the home page");
    }
    else if(url==="/about"){
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("this is  about page");
    }
    else if(url==="/projects"){
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("this is projects page");

    }
    else{
        res.writeHead(404,{"content-type":"text/plain"});
        res.end("page not found");
    
    }
});
const port=3000;
myrouts.listen(port,()=>console.log(`server is listning to the port ${port}`))