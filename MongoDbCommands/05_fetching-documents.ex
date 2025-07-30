db.createCollection("BackendDev")
{ ok: 1 }
//inserting multple documents at one
db.BackenDev.insertMany([
    {naem:"Dani Bruk",salary:80000,skill:["python","Java","PHP"]},
      {naem:"Bereket Abel",salary:50000,skill:["python","C#","C++"]},
        {naem:"Nahom Tamiru",salary:90000,skill:["python","glond","PHP"]}
    ])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('688903a48d5edbab86dbad25'),
    '1': ObjectId('688903a48d5edbab86dbad26'),
    '2': ObjectId('688903a48d5edbab86dbad27')
  }
}
show  collections
BackendDev
BackenDev
FrontEndDev
//fetching all documents
db.FrontEndDev.find()
{
  _id: ObjectId('6887b2b71d8d69c400d9aef4'),
  Name: 'Simon Boa',
  empID: 123,
  salary: 890000
}
{
  _id: ObjectId('6887b2b71d8d69c400d9aef5'),
  Name: 'David Powel',
  empID: 134,
  salary: 35000
}
{
  _id: ObjectId('6887b2b71d8d69c400d9aef6'),
  Name: 'Sau Ref',
  empID: 145,
  salary: 500000
}
{
  _id: ObjectId('6887b2b71d8d69c400d9aef7'),
  name: 'Sara Cameron',
  empID: 156,
  salary: 60000
}
//fetching only one elements fron the frist
db.FrontEndDev.findOne()
{
  _id: ObjectId('6887b2b71d8d69c400d9aef4'),
  Name: 'Simon Boa',
  empID: 123,
  salary: 890000
}
//fetching by specific give conditions
db.FrontEndDev.find({empID:145})
{
  _id: ObjectId('6887b2b71d8d69c400d9aef6'),
  Name: 'Sau Ref',
  empID: 145,
  salary: 500000
}




//projection in mongodb to specifies the included and excluded fields

db.BackenDev.find()
{
  _id: ObjectId('688903a48d5edbab86dbad25'),
  naem: 'Dani Bruk',
  salary: 80000,
  skill: [
    'python',
    'Java',
    'PHP'
  ]
}
{
  _id: ObjectId('688903a48d5edbab86dbad26'),
  naem: 'Bereket Abel',
  salary: 50000,
  skill: [
    'python',
    'C#',
    'C++'
  ]
}
{
  _id: ObjectId('688903a48d5edbab86dbad27'),
  naem: 'Nahom Tamiru',
  salary: 90000,
  skill: [
    'python',
    'glond',
    'PHP'
  ]
}

db.BackenDev.find(
    {naem:'Nahom Tamiru'},
    {_id:0,naem:true,skill:true})
{
  naem: 'Nahom Tamiru',
  skill: [
    'python',
    'glond',
    'PHP'
  ]
}
Employee
Selection deleted

