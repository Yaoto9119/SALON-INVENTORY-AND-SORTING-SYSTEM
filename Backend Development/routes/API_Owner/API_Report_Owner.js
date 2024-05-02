var express = require('express');

var router = express.Router();

var jwt_token = require('jsonwebtoken');

var dbConn = require('../../config/db');
// SELECT or (VIEW)
router.get('/View_Report', (req, res) => {
    sqlQuery = "SELECT * FROM report";

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
        if (error) throw error;
        res.status(200).json(results);
    });
});

module.exports = router;