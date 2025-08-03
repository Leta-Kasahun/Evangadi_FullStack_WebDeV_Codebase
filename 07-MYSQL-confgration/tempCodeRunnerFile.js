const express=require('express');
const app=express();
const port=process.env.PORT||3009;
const mysql=require('mysql2/promise');
async function startserver() {
  try{
      const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'teku',
          password: 'teku123',
          datbase: 'teku_database'
      });
      console.log('databse is connected');
    //creating tables  Items;
    await connection.execute(`CREATE TABLE IF NOT EXISTS ITEMS(
               id INT AUTO_INCREMENT PRIMARY KEY,
                NAME VARCHAR(50) NOT NULL,
               QUANTITY INT NOT NULL,
               PRICE INT NOT NULL
      )`);
      console.log('table is created');
      //inserting data
      const itemDatas=[['Laptop',10,500000],['shoes',30,13000],['airpad',12,19000]]
//inserting the data
for (let data of itemDatas ) await connection.execute(`INSERT INTO ITEMS(NAME,QUANTITY,PRICE) VALUES(?,?,?)`,data);
console.log('data is inserted successfuly');
    
  //     const [datas] = await connection.execute(`select * from contract_employees;`);
  // datas.forEach(data=>console.log(data));
    
    }
    catch(error){
        console.log("database  connections is failed: ",error);
    }}
startserver();