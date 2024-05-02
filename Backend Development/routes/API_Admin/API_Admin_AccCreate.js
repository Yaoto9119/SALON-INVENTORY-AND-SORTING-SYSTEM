var express = require('express');

var router = express.Router();

var bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

var dbConn = require('../../config/db.js');

//INSERT
router.post('/Staff/New_Account', async (req, res) => {

    var salt_rounds = 10;

    var Account_Id = req.body.Account_Id;
    var Email = req.body.Email;
    var Password = req.body.Password;
    var Username = req.body.Username;
    var Name = req.body.Name;
    var Role = req.body.Role;
    const hash_password = await bcrypt.hash(Password,parseInt(salt_rounds))

    sqlQuery = `INSERT INTO accounts(Account_Id,Email,Password,Username,Name,Role) VALUES (${Account_Id},"${Email}","${hash_password}","${Username}","${Name}","${Role}")`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// SELECT or (VIEW)
router.get('/View/Account', (req, res) => {
    sqlQuery = "SELECT * FROM accounts";

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
        if (error) throw error;
        res.status(200).json(results);
    });
});

// UPDATE
router.put('/Update/Account', async (req, res) => {
    const salt_rounds = 10;
    
    var Account_Id = req.body.Account_Id;
    var Email = req.body.Email;
    var Password = req.body.Password;
    var Username = req.body.Username;
    var Name = req.body.Name;
    var Role = req.body.Role;

    const hash_password = await bcrypt.hash(Password,parseInt(salt_rounds))

    sqlQuery = `UPDATE accounts SET Email = "${Email}", Password = "${hash_password}", Username = "${Username}", Name = "${Name}", Role = "${Role}" WHERE Account_Id = ${Account_Id}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// DELETE
router.delete('/Delete/Account', (req, res) => {
    var Account_Id = req.body.Account_Id;

    sqlQuery = `DELETE FROM accounts WHERE Account_Id = ${Account_Id}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

module.exports = router;