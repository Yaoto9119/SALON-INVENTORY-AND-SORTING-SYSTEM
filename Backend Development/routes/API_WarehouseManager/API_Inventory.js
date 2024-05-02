var express = require('express');

var router = express.Router();

var dbConn = require('../../config/db');

//INSERT
router.post('/New_Item', (req, res) => {

    var Item_Id = req.body.Item_Id;
    var ItemName = req.body.ItemName;
    var Quantity = req.body.Quantity;
    var Description = req.body.Description;
    var Type = req.body.Type;

    sqlQuery = `INSERT INTO inventory(Item_Id, ItemName, Quantity, Description, Type) VALUES (${Item_Id},"${ItemName}", ${Quantity}, "${Description}", "${Type}")`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// SELECT or (VIEW)
router.get('/View_Item', (req, res) => {
    sqlQuery = "SELECT * FROM inventory";

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
        if (error) throw error;
        res.status(200).json(results);
    });
});

// UPDATE
router.put('/Update_Item', (req, res) => {
    var Item_Id = req.body.Item_Id;
    var ItemName = req.body.ItemName;
    var Quantity = req.body.Quantity;
    var Description = req.body.Description;
    var Type = req.body.Type;

    sqlQuery = `UPDATE inventory SET ItemName = "${ItemName}", Quantity = ${Quantity} , Description = "${Description}", Type = "${Type}" WHERE Item_Id = ${Item_Id}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// DELETE
router.delete('/Delete_Item', (req, res) => {
    var Item_Id = req.body.Item_Id;

    sqlQuery = `DELETE FROM inventory WHERE Item_Id = ${Item_Id}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

module.exports = router;