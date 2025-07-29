//showing availaible database
show dbs 
admin    40.00 KiB
config  108.00 KiB
local    72.00 KiB
  // creating database student
use student
switched to db student



//craeting collection within thier documents like creating table in RLDB whi thier repective rows
db.student.insertOne({Name:"Simon Boa",cgpa:3.98,age:22,email:"simon@example.com"})
{
  acknowledged: true,
  insertedId: ObjectId('68876ac263088025c0d91504')
}
// since id is not provided by default mongodb can generates the objects id




//showing documents in the collection
db.student.find()
{
  _id: ObjectId('68876ac263088025c0d91504'),
  Name: 'Simon Boa',
  cgpa: 3.98,
  age: 22,
  email: 'simon@example.com'
}


//deleting database permanetly from mongodb server
db.dropDatabase()
{ ok: 1, dropped: 'student' }


//testing the database
show dbs 
admin    40.00 KiB
config  108.00 KiB
local    72.00 KiB
student

