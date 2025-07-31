const express=require('express');
const app=express();
app.get("/",(req,res)=>res.send("heelow world"));
const port = process.env.PORT ||3000;
app.listen(port,()=>console.log(`the server is listning to  the port  ${port}`));