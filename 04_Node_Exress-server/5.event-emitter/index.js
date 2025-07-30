const eventEmiter=require('events');
const myeventListner=new eventEmiter();
myeventListner.on('greet',(name)=>console.log(`Hellow, ${name} how are you ?`));
myeventListner.emit('greet',"Leta Kasahun");
