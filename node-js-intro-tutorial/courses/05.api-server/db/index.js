const mysql = require('mysql');

const db = mysql.createPool({
  host: '127.0.0.1',
  user: '',
  password: '',
  database: '',
});

module.exports = db;
