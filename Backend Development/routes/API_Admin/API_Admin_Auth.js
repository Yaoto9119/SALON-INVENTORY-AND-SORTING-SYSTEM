var express = require('express');

var router = express.Router();

var bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

var dbConn = require('../../config/db.js');

//INSERT
router.post('/Staff/Signup', async (req, res) => {

    var Account_Id = req.body.Account_Id;
    var Email = req.body.Email;
    var Password = req.body.Password;
    var Username = req.body.Username;
    var Name = req.body.Name;
    var Role = req.body.Role;

    try{
        sqlQuery = `INSERT INTO accounts(Account_Id,Email,Password,Username,Name,Role) VALUES (${Account_Id},"${Email}","${Password}","${Username}","${Name}","${Role}")`

        dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
            });
    }
    catch(error){
        console.log(error);
        return next (error);
    }
   res.status(200).json({success: true});   
});

router.post('/Staff/Login', async (req, res) => {

    var Username = req.body.Username;
    var Password = req.body.Password;

    try{
        sqlQuery = `Select * FROM accounts WHERE Username = "${Username}" AND Password = "${Password}"`;
        dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
        Object.keys(results).forEach(function(key){
            var row = results[key];
            var Username = row.Username;

            var data = {
                Username: row.Username
            };
            token = jwt.sign({data: data},'secretcodehere',{expiresIn: '1h'});

        res.status(200).json({success: true, token: token});
            });
    });
}
    catch(error){
        console.log(error);
        return next (error);
    }
});


module.exports = router;