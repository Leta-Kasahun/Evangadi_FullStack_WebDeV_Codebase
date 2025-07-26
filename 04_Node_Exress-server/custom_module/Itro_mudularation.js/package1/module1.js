class Person {
    constrctor(name,age){
        this.name=name;
        this,age=age;

    }
    greeting(){
        console.log(`hellow My name is ${this.name} and I am ${this.age} years old.`);
    }
}
module.exports=Person;