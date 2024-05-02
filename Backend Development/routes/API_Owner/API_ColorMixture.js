var express = require('express');

var router = express.Router();

var dbConn = require('../../config/db');

//INSERT
router.post('/New_Mixture', (req, res) => {

    var Color_Id = req.body.Color_Id;
    var ColorName = req.body.ColorName;
    var Description = req.body.Description;

    sqlQuery = `INSERT INTO recipe(Color_Id, ColorName, Description) VALUES (${Color_Id}, "${ColorName}", "${Description}")`;

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// SELECT or (VIEW)
router.get('/View_Mixture', (req, res) => {
    sqlQuery = "SELECT * FROM recipe";

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
        if (error) throw error;
        res.status(200).json(results);
    });
});

// UPDATE
router.put('/Update_Mixture', (req, res) => {
    var Color_Id = req.body.Color_Id;
    var ColorName = req.body.ColorName;
    var Description = req.body.Description;

    sqlQuery = `UPDATE recipe SET ColorName = "${ColorName}", Description = "${Description}" WHERE Color_Id = ${Color_Id}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// DELETE
router.delete('/Delete_Mixture', (req, res) => {
    var Color_Id = req.body.Color_Id;

    sqlQuery = `DELETE FROM recipe WHERE Color_Id = ${Color_Id}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

module.exports = router;