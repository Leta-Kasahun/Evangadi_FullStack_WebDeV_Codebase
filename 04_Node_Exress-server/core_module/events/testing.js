const events=require('events');
//console.log(events);
//this stated by event emiter
const eventEmiter=events.EventEmitter();
function myEventEmitor(){
    console.log("this emited by event module");
}
//creates event emitText
eventEmiter.on("emitText",myEventEmitor);
//trigerd by emit 
eventEmiter.emit("emitText");