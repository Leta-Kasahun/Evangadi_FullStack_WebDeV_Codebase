//method 1 directly inserting the documents it automatically created and inserted
db.Laptop.insertOne({model:"HP EliteBook",core:7,gen:11,price:65000})
{
  acknowledged: true,
  insertedId: ObjectId('6887728963088025c0d91505')
}


//showing the available collections
show collections
Laptop
//showing the documents within collections
db.Laptop.find()
{
  _id: ObjectId('6887728963088025c0d91505'),
  model: 'HP EliteBook',
  core: 7,
  gen: 11,
  price: 65000
}

//method 2: by using create collection command
db.createCollection('Desktop')
{ ok: 1 }


//inserting documents
db.Desktop.insertOne({model:"Dell",core:5,gen:4,price:20000})
{
  acknowledged: true,
  insertedId: ObjectId('6887741e63088025c0d91506')
}


//showing documents
db.Desktop.find()
{
  _id: ObjectId('6887741e63088025c0d91506'),
  model: 'Dell',
  core: 5,
  gen: 4,
  price: 20000
}


// showing all colletctions
show collections
Desktop
Laptop



//droping collection
db.Desktop.drop()
true
//this true idicates the collection desktop is droped successfully 
show collections
Laptop



//inserting addtional  documents to the laptop
db.Laptop.insertOne({model:"Asir",core:5,gen:13,price:75000})
{
  acknowledged: true,
  insertedId: ObjectId('688776dd63088025c0d91507')
}
db.Laptop.find()
{
  _id: ObjectId('6887728963088025c0d91505'),
  model: 'HP EliteBook',
  core: 7,
  gen: 11,
  price: 65000
}
{
  _id: ObjectId('688776dd63088025c0d91507'),
  model: 'Asir',
  core: 5,
  gen: 13,
  price: 75000
}
Iteems

