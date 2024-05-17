var express = require('express');

var router = express.Router();

const jwt_token = require('jsonwebtoken');

var dbConn = require('../config/db');

// SELECT or (VIEW)
router.get('/View/Report', async (req, res) => {
    const Pass = req.headers.authorization?.split(' ')[1];
  
    if (!Pass) {
      console.log('JWT token not found');
      res.status(401).json({ success: false, message: "Error, JWT token not found" });
      return;
    }
  
    try {
      console.log('Decoding JWT token');
      const decodedToken = jwt_token.verify(Pass, process.env.Special_Token);
      const { Info: {Account_Id} } = decodedToken;
  
      sqlQuery = "SELECT * FROM report WHERE Account_Id = ?";
  
      dbConn.con1.query(sqlQuery, [Account_Id], function (error, results, fields) {
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

  // SELECT or (VIEW)
router.get('/ViewAll/Report', async (req, res) => {
    const Pass = req.headers.authorization?.split(' ')[1];
  
    if (!Pass) {
      console.log('JWT token not found');
      res.status(401).json({ success: false, message: "Error, JWT token not found" });
      return;
    }
  
    try {
      console.log('Decoding JWT token');
      const decodedToken = jwt_token.verify(Pass, process.env.Special_Token);
      const { Info: {Account_Id} } = decodedToken;
  
      sqlQuery = "SELECT * FROM report";
  
      dbConn.con1.query(sqlQuery, [Account_Id], function (error, results, fields) {
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

  // DELETE
router.delete('/Delete/Report', (req, res) => {

  const Pass = req.headers.authorization.split(' ')[1];

  if (!Pass) {
      console.log('JWT token not found');
      return res.status(401).json({ success: false, message: "Error, JWT token not found" });
  }

  try {
      console.log('Decoding JWT token');
      const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

      var Report_Id = req.body.Report_Id;

      sqlQuery = `DELETE FROM report WHERE Report_Id = ${Report_Id}`;

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