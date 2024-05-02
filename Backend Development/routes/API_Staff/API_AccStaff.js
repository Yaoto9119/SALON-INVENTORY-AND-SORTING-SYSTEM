var express = require('express');

var router = express.Router();

var bcrypt = require('bcrypt');

var jwt_token = require('jsonwebtoken');

var dbConn = require('../../config/db');

router.post('/login', async (req, res, next) => {
    var Username = req.body.Username;
    var Password = req.body.Password;
    
    if(!Username || !Password){
        return res.status(400).json({error: 'Missing fields'});
    }
    
    try{  
        sqlQuery = `SELECT * FROM accounts d_stu WHERE Username = "${Username}"`
        
        dbConn.con1.query(sqlQuery, async(error, results) => {
            console.log(results);
        Object.keys(results).forEach(function(key){
            var row = results[key]

            var Username = row.Username;

            var login_Info = {
                Username: row.Username
            }

auth = jwt_token.sign({Info: login_Info},process.env.Special_Token,{expiresIn:'1h'});

           res.status(200).json({success: true, token: auth});
        });
            
            if(results.length > 0){
                if(await bcrypt.compare(Password, results[0].Password)) {
                    res.status(200).json({Status: true});
                } else {
                    res.status(401).json({error: 'Invalid credentials'});
                }
            } else {
                res.status(401).json({error: 'Invalid credentials'});
            }
        });
    }
    catch(error){
        console.log(error);
        return next(error);
    }
});

module.exports = router;