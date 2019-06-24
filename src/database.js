const mysql = require('mysql');
const { database } = require('./key.js');
const { promisify } = require('util');
const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if(connection) connection.release();
    console.log('conexion exitosa');
    return;
})

pool.query = promisify(pool.query);

module.exports = pool;