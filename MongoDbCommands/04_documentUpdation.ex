//updating one documents
//this updation takes two args one filter and the other is to updates  stats with$ to updates salary from 60000 to 90000
db.FrontEndDev.updateOne(
    {empID:156},
    {$set:{salary:90000}}
)
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
//showing after updation
db.FrontEndDev.find({empID:156})
{
  _id: ObjectId('6887b2b71d8d69c400d9aef7'),
  name: 'Sara Cameron',
  empID: 156,
  salary: 90000
}
Employee



//updating multple documents inserts and updates authomatically since the city is already not insertedId
db.FrontEndDev.updateMany(
    {},
    {$set:{city:'Adis'}
    }
)
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 4,
  modifiedCount: 4,
  upsertedCount: 0
}


//showing  ufter city is added
db.FrontEndDev.find()
{
  _id: ObjectId('6887b2b71d8d69c400d9aef4'),
  Name: 'Simon Boa',
  empID: 123,
  salary: 890000,
  city: 'Adis'
}
{
  _id: ObjectId('6887b2b71d8d69c400d9aef5'),
  Name: 'David Powel',
  empID: 134,
  salary: 35000,
  city: 'Adis'
}
{
  _id: ObjectId('6887b2b71d8d69c400d9aef6'),
  Name: 'Sau Ref',
  empID: 145,
  salary: 500000,
  city: 'Adis'
}
{
  _id: ObjectId('6887b2b71d8d69c400d9aef7'),
  name: 'Sara Cameron',
  empID: 156,
  salary: 90000,
  city: 'Adis'
}
Employee
Selection deleted

