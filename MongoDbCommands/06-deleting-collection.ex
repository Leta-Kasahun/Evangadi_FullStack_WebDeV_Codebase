//deleting the documents with in the collections
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
//fro the frist deletes  name dani bruk
db.BackenDev.deleteOne({})
{
  acknowledged: true,
  deletedCount: 1
}
//testing as the frist elemet is deleted
db.BackenDev.find()
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
//successfully deleted next is delete one by feltering specific conditions
db.BackenDev.deleteOne({name:'Nahom Tamiru'})
{
  acknowledged: true,
  deletedCount: 0
}
//testing as nahom is deleted
db.BackenDev.find()
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
//the other is deletes many
db.BackenDev.deleteMany({naem:'Bereket Abel',naem:'Nahom Tamiru'})
{
  acknowledged: true,
  deletedCount: 1
}
//testing as it is deleted
db.BackenDev.find()
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
db.BackenDev.deleteMany({})
{
  acknowledged: true,
  deletedCount: 1
}
//this freed all documents with in the collections
db.BackenDev.find()
Employee

