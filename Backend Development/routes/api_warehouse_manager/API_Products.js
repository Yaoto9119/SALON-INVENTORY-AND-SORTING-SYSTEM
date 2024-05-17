const express = require('express');
const router = express.Router();
const jwt_token = require('jsonwebtoken');
const dbConn = require('../../config/db');

//INSERT
router.post('/New/Recipe', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

        var {
            Color_Id,
            ColorName,
            Description, 
        } = req.body;

        var sqlQuery = `INSERT INTO recipe (Color_Id,ColorName,Description) VALUES (?, ?, ?)`;

        dbConn.con1.query(
            sqlQuery, [Color_Id,ColorName,Description],
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

router.get('/Search/Product', async (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

  if (!Pass) {
    return res.status(401).json({ success: false, message: 'Error, JWT token not found' });
  }

  try {
    console.log('Decoding JWT token');
      const decodedToken = jwt_token.verify(Pass, process.env.Special_Token);

    const ColorName = req.body.ColorName;

    if (!ColorName) {
      return res.status(400).json({ success: false, message: 'Error, search term is required' });
    }

    const query = 'SELECT * FROM recipe WHERE ColorName LIKE ?';
    dbConn.con1.query(query, [`%${ColorName}%`], (error, results) => {
      if (error) {
        return res.status(500).json({ success: false, message: 'Error, invalid JWT token' });
      }

      return res.status(200).json(results);
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error, invalid JWT token' });
  }
});

// UPDATE
router.put('/Update/Recipe', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];
  
    if (!Pass) {
      console.log('JWT token not found');
      res.status(401).json({ success: false, message: "Error, JWT token not found" });
      return;
    }
  
    try {
      console.log('Decoding JWT token');
      const decodedToken = jwt_token.verify(Pass, process.env.Special_Token);
      const { Info } = decodedToken;
  
    var Color_Id = req.body.Color_Id;
    var ColorName = req.body.ColorName;
    var Description = req.body.Description;

    sqlQuery = `UPDATE recipe SET ColorName = "${ColorName}", Description = "${Description}" WHERE Color_Id = ${Color_Id}`

    dbConn.con1.query(
        sqlQuery, [Color_Id,ColorName,Description],
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


// DELETE
router.delete('/Delete/Recipe', (req, res) => {

  const Pass = req.headers.authorization.split(' ')[1];

  if (!Pass) {
      console.log('JWT token not found');
      return res.status(401).json({ success: false, message: "Error, JWT token not found" });
  }

  try {
      console.log('Decoding JWT token');
      const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

      var Color_Id = req.body.Color_Id;

      sqlQuery = `DELETE FROM recipe WHERE Color_Id = ${Color_Id}`;

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