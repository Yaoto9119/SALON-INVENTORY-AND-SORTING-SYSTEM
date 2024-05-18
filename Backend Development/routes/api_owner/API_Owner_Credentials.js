var express = require('express');

var router = express.Router();

var bcrypt = require('bcrypt');

var jwt_token = require("jsonwebtoken");

var dbConn = require('../../config/db.js');



//INSERT
router.post('/Staff/Signup', async (req, res) => {
  var salt_rounds = 10;

  var Account_Id = req.body.Account_Id;
  var Email = req.body.Email;
  var Username = req.body.Username;
  var Password = req.body.Password;
  var Name = req.body.Name;
  var Role = req.body.Role;

  const hash_password = await bcrypt.hash(Password, parseInt(salt_rounds));

  try {
      const sqlQuery = `INSERT INTO accounts(Account_Id, Email, Username, Pwd, Name, Role) VALUES (?,?,?,?,?,?)`;
      dbConn.con1.query(sqlQuery, [Account_Id, Email,  Username,hash_password, Name, Role], function (error, results, fields) {
          if (error) {
              console.log(error);
              return next(error);
          }
          console.log(results);
          res.status(200).json({ success: true });
      });
  } catch (error) {
      console.log(error);
      return next(error);
  }
});


// SELECT or (VIEW)
router.get('/View/Account', async (req, res) => {
    const Pass = req.headers.authorization?.split(' ')[1];
  
    if (!Pass) {
      console.log('JWT token not found');
      res.status(401).json({ success: false, message: "Error, JWT token not found" });
      return;
    }
  
    try {
      console.log('Decoding JWT token');
      const decodedToken = jwt_token.verify(Pass, process.env.Special_Token);
      const { Info } = decodedToken;
  
      sqlQuery = "SELECT * FROM accounts";
  
      dbConn.con1.query(sqlQuery, function (error, results, fields) {
        if (error) {
          console.log('Error executing query', error);
          res.status(500).json({ success: false, message: "Error, invalid JWT token" });
          return;
        }
  
        console.log('Request was viewed', results);
        res.status(200).json(results);
      });
    } catch (error) {
      console.log('Error caught', error);
      res.status(500).json({ success: false, message: "Error, invalid JWT token" });
    }
  });

  // UPDATE
  router.post('/Staff/Update', async (req, res) => {
    var salt_rounds = 10;

  var Account_Id = req.body.Account_Id;
  var Email = req.body.Email;
  var Username = req.body.Username;
  var Password = req.body.Password;
  var Name = req.body.Name;
  var Role = req.body.Role;

  const hash_password = await bcrypt.hash(Password, parseInt(salt_rounds));

  try {
      const sqlQuery = `UPDATE INTO accounts Email = "${Email}", Username = "${Username}", Pwd = "${hash_password}", Name = "${Name}", Role = "${Role}" WHERE Account_Id = ${Account_Id}`;
      dbConn.con1.query(sqlQuery, [Account_Id, Email,  Username,hash_password, Name, Role], function (error, results, fields) {
          if (error) {
              console.log(error);
              return next(error);
          }
          console.log(results);
          res.status(200).json({ success: true });
      });
  } catch (error) {
      console.log(error);
      return next(error);
  }
});

  // Delete
  router.delete('/Delete/Account', (req, res) => {

    const Pass = req.headers.authorization.split(' ')[1];
  
    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }
  
    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);
  
        var Account_Id = req.body.Account_Id;
  
        sqlQuery = `DELETE FROM accounts WHERE Account_Id = ${Account_Id}`;
  
        dbConn.con1.query(sqlQuery, function(error, results, fields){
            if (error) {
                console.log('Error executing query', error);
                return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
  });


module.exports = router;