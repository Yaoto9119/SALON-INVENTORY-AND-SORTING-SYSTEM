var express = require('express');

var router = express.Router();

var dbConn = require('../../config/db');

//INSERT
router.post('/NewReport', (req, res) => {

    var ReportName = req.body.ReportName;
    var Content = req.body.Content;
    var Date = req.body.Date;
    var Item_Id = req.body.Item_Id;
    var Account_Id = req.body.Account_Id;
    var Color_Id = req.body.Color_Id;

    sqlQuery = `INSERT INTO report(ReportName, Content, Date, Item_Id, Account_Id, Color_Id) VALUES ("${ReportName}", "${Content}", "${Date}", ${Item_Id}, ${Account_Id}, ${Color_Id})`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// SELECT or (VIEW)
router.get('/ViewInfo', (req, res) => {
    sqlQuery = "SELECT * FROM report";

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
        if (error) throw error;
        res.status(200).json(results);
    });
});

// UPDATE
router.put('/UpdateInfo', (req, res) => {
    var Report_Id = req.body.Report_Id;
    var ReportName = req.body.ReportName;
    var Content = req.body.Content;
    var Date = req.body.Date;
    var Item_Id = req.body.Item_Id;
    var Account_Id = req.body.Account_Id;
    var Color_Id = req.body.Color_Id;

    sqlQuery = `UPDATE report SET ReportName = "${ReportName}", Content = "${Content}", Date = ${Date} , Item_Id = ${Item_Id}, Account_Id = ${Account_Id}, Color_Id = ${Color_Id}, WHERE Report_Id = ${Report_Id}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// DELETE
router.delete('/Delete_Report', (req, res) => {
    var ID = req.body.ID;

    sqlQuery = `DELETE FROM report WHERE Report_Id = ${Report_Id}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

module.exports = router;