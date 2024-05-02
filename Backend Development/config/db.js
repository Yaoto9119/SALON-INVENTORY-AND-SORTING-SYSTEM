var mysql = require('mysql'); 

var con1 = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'inventory_system',
});

con1.connect(function (error) {
if (!!error) {
console.log(error);
} else {
console.log('MySQL Database_Main Connected..!');
}
});

module.exports = {con1};