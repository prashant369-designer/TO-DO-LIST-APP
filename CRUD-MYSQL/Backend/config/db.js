import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


//2 crate a db
// await db.execute("CREATE DATABASE crudmysql");
// console.log(await db.execute("SHOW DATABASES")); 

//3 create a table
// await db.execute(`
//     CREATE TABLE users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255),
//         phone VARCHAR(255),
//         message VARCHAR(255)
//     )
// `);
// console.log("Table created");



export default db;