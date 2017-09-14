// config/database.js
module.exports = {

    'url' : 'alisthubmarketing' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};

var mysql = require('mysql');

module.exports.connection=function (){

var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '',
database : 'alisthubmarketing'
});
return connection;

}
