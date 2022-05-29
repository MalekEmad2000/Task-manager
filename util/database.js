const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'react',
    database: 'taskmanagmentsystem',
  })
module.exports=pool.promise();
