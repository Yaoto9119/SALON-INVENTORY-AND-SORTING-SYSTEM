var express = require('express');

var router = express.Router();

var dbConn = require('../../config/db');

// SELECT or (VIEW)
router.get('/View_Account', (req, res) => {
    sqlQuery = `SELECT ColorName, Description FROM recipe WHERE Color_Id = ${Color_Id}`;

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
        if (error) throw error;
        res.status(200).json(results);
    });
});

module.exports = router;