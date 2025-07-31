const express=require('express');
const path=require('path');
const port=process.env.PORT||3002;
const app=express();
//serve from public directory
app.use(express.static(path.join(__dirname,'public')));
//server styled file  or page when aceessing the root url
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
//starting the server
app.listen(port,()=>console.log(`server is  listning to ${port} port`));
