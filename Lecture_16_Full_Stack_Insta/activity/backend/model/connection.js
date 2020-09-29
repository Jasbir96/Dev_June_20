const mysql = require('mysql');
const { user, db_password, db_name } =
 require("../config/secrets.json");
const connection = mysql.createConnection({
    host: 'localhost',
    user: user,
    password: db_password,
    database: db_name
})
connection.connect();
console.log("connected to DB");
module.exports=connection;