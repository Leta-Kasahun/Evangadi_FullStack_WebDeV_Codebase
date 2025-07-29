use Employee
switched to db Employee
//inserting multiple documents to the collection at once
db.createCollection("FrontEndDev")
{ ok: 1 }
db.FrontEndDev.isertMany([
    {Name:"Simon Boa",empID:123,salary:890000},
    {Name:"David Powel",empID:134,salary:35000},
    {Name:"Sau Ref",empID:145,salary:500000},
    {name:"Sara Cameron",empID:156,salary:60000}
])

{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6887b2b71d8d69c400d9aef4'),
    '1': ObjectId('6887b2b71d8d69c400d9aef5'),
    '2': ObjectId('6887b2b71d8d69c400d9aef6'),
    '3': ObjectId('6887b2b71d8d69c400d9aef7')
  }
}



//showing all documents
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
Employee

