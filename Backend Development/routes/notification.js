var express = require('express');

var router = express.Router();

var jwt_token = require('jsonwebtoken');

var dbConn = require('../config/db');

router.post('/New/Notification', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }
    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

        var Notification_Id = req.body.Notification_Id;
        var Content = req.body.Content;
        var Date = req.body.Date;
        var Account_Id = req.body.Account_Id;

        sqlQuery = `INSERT INTO notification (Notification_Id, Content, Date, Account_Id) VALUES (?, ?, ?, ?)`;
        dbConn.con1.query(sqlQuery, [Notification_Id, Content, Date, Account_Id], function(error, results, fields){
            if (error) {
                console.log('Error executing query', error);
                throw error;
            }
            console.log('New event added', results);
            res.status(200).json(results);
        });
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

// SELECT or (VIEW)
router.get('/View/Notification', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);
        var Account_Id = req.body.Account_Id;

        if (!Account_Id) {
            console.log('Account Id not found in request query');
            return res.status(400).json({ success: false, message: "Error, Account Id not found in request query" });
        }

        sqlQuery = `SELECT Content, Date, Account_Id FROM notification WHERE Account_Id = ${Account_Id}`;

        dbConn.con1.query(
            sqlQuery, 
            function (error, results, fields) {
                if (error) {
                    console.log('Error executing query', error);
                    throw error;
                }
                console.log('New event added', results);
                res.status(200).json(results[0]); 
            }
        );
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

module.exports = router;