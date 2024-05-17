var express = require('express');

var router = express.Router();

const jwt_token = require('jsonwebtoken');


var dbConn = require('../../config/db');

//INSERT
router.post('/New/Item', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

        var {
            Item_Id,
            ItemName,
            Quantity,
            Description,
            Type,
        } = req.body;

        var sqlQuery = `INSERT INTO inventory (Item_Id,ItemName,Quantity,Description,Type) VALUES (?, ?, ?, ?, ?)`;

        dbConn.con1.query(
            sqlQuery, [Item_Id,ItemName,Quantity,Description,Type],
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
router.get('/Search/Item', async (req, res) => {
  const Pass = req.headers.authorization.split(' ')[1];

if (!Pass) {
  return res.status(401).json({ success: false, message: 'Error, JWT token not found' });
}

try {
  console.log('Decoding JWT token');
    const decodedToken = jwt_token.verify(Pass, process.env.Special_Token);
    const { Info } = decodedToken;

  const ItemName = req.body.ItemName;

  if (!ItemName) {
    return res.status(400).json({ success: false, message: 'Error, search term is required' });
  }

  const query = 'SELECT * FROM inventory WHERE ItemName LIKE ?';
  dbConn.con1.query(query, [`%${ItemName}%`], (error, results) => {
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
router.put('/Update_Item', (req, res) => {
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
  
    var Item_Id = req.body.Item_Id;
    var ItemName = req.body.ItemName;
    var Quantity = req.body.Quantity;
    var Description = req.body.Description;
    var Type = req.body.Type;

    sqlQuery = `UPDATE inventory SET ItemName = "${ItemName}", Quantity = ${Quantity} , Description = "${Description}", Type = "${Type}" WHERE Item_Id = ${Item_Id}`

    dbConn.con1.query(
        sqlQuery, [Item_Id,ItemName,Quantity,Description,Type],
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
router.delete('/Delete_Item', (req, res) => {
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
      
    var Item_Id = req.body.Item_Id;

    sqlQuery = `DELETE FROM inventory WHERE Item_Id = ${Item_Id}`;
  
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

module.exports = router;