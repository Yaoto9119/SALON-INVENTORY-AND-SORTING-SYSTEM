var express = require('express');

var router = express.Router();

const jwt_token = require('jsonwebtoken');


var dbConn = require('../config/db');

//INSERT
router.post('/Request/Products', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

        var {
            Request_Id,
            Color_Id,
            ColorName,
            Amount,
            Account_Id,
        } = req.body;

        var sqlQuery = `INSERT INTO request (Request_Id, Color_Id, ColorName, Amount, Account_Id) VALUES (?, ?, ?, ?, ?)`;

        dbConn.con1.query(
            sqlQuery, [Request_Id, Color_Id, ColorName, Amount, Account_Id],
            function (error, results, fields) {
                if (error) {
                    console.log('Error executing query', error);
                    return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
                }
                console.log('New Item added', results);
                res.status(200).json(results);
            }
        );
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

//VIEW
router.get('/View/Request', async (req, res) => {
  const Pass = req.headers.authorization.split(' ')[1];

if (!Pass) {
  return res.status(401).json({ success: false, message: 'Error, JWT token not found' });
}

try {
  console.log('Decoding JWT token');
    const decodedToken = jwt_token.verify(Pass, process.env.Special_Token);
    const { Info } = decodedToken;

  const Request_Id = req.body.Request_Id;

  if (!Request_Id) {
    return res.status(400).json({ success: false, message: 'Error, search term is required' });
  }

  const query = 'SELECT * FROM request WHERE Request_Id = ?';
  dbConn.con1.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Error, invalid JWT token' });
    }

    return res.status(200).json(results);
  });
} catch (error) {
  return res.status(500).json({ success: false, message: 'Error, invalid JWT token' });
}
});

router.delete('/Delete/Request', (req, res) => {

  const Pass = req.headers.authorization.split(' ')[1];

  if (!Pass) {
      console.log('JWT token not found');
      return res.status(401).json({ success: false, message: "Error, JWT token not found" });
  }

  try {
      console.log('Decoding JWT token');
      const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

      var Request_Id = req.body.Request_Id;

      sqlQuery = `DELETE FROM request WHERE Request_Id = ${Request_Id}`;

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