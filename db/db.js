var mysql = require('mysql');
var config = require('../config/config.json');

//local mysql db connection
var connection = mysql.createConnection({
    host     : config.database.host,
    user     : config.database.user,
    password : config.database.password,
    database : config.database.database
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;