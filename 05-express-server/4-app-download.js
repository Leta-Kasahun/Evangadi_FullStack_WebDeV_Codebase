const  express=require('express');
const path=require('path');
const port=process.env.PORT||3008;
const app=express();
//to force the users to doawloads
// app.get('/downloads-resume',(req,res)=>{
//     const file=path.join(__dirname,'files','resume.txt');
//     res.download(file,'Leta-Ksahun-resume.txt',err=>{
//         if(err)
//         {console.log('dowloads failed');
//         res.status(404).send('file  not found')}
//     })
// })

//to displays the text content directly
app.get('/resume',(req,res)=>res.sendFile(path.join(__dirname,'files','resume.txt')));
//start app
app.listen(port,()=>console.log(`server is listning to port ${port}`));