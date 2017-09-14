var mysql = require('mysql');
module.exports.connection=function (){
  var connection = mysql.createConnection({
    host : '127.0.0.1',
user : 'root',
password : '',
database : 'parush'
  });
  return connection;
}