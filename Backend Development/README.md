# Final_Project-Backend
Current Problems:
    >Takes too much time to collect data(admin POV)
    >Better use of naming conventions
    >Use of triggers in phpmyadmin

Recommended Solutions:
    >Use a faster selection method 
    >Use a better database design (referencing in mysql designer)

Pending:
>Login
>Notification(Create,View)
>Request Product(Create,View)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt_token = require('jsonwebtoken');
const dbConn = require('../../config/db.js');

// user sign up
router.post('/Staff/Signup', async (req, res) => {
    try {
        const SALT_ROUNDS = 10; // Increase salt rounds for stronger hashing

        // Ensure all required fields are provided
        if (!req.body.Account_Id || !req.body.Email || !req.body.Username || !req.body.Password || !req.body.Name || !req.body.Role) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(req.body.Password, SALT_ROUNDS);

        // Prepare SQL query
        const sqlQuery = `INSERT INTO accounts(Account_Id, Email, Username, Pwd, Name, Role) VALUES (?, ?, ?, ?, ?, ?)`;

        // Values parameter for prepared statement
        const values = [
            req.body.Account_Id,
            req.body.Email,   
            req.body.Username,            
            hashedPassword,
            req.body.Name,
            req.body.Role
        ];

        // Execute the SQL query
        dbConn.con1.query(sqlQuery, values, (error, results) => {
            if (error) {
                console.error("Error signing up:", error);
                return res.status(500).json({ success: false, message: "Failed to sign up. Please try again later." });
            }
            return res.status(200).json({ success: true, message: "User signed up successfully." });
        });
    } catch (error) {
        console.error("Error signing up:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// user log in
router.post('/login', async (req, res) => {
  try {
      const Username = req.body.Username;
      const Password = req.body.Password;

      // Ensure username and password are provided
      if (!Username || !Password) {
          return res.status(400).json({ error: 'Missing username or password' });
      }

      // Retrieve user account with the provided username
      const sqlQuery = `SELECT * FROM accounts WHERE Username = ?`;
      dbConn.con1.query(sqlQuery, [Username], async (error, results) => {
          if (error) {
              console.error("Error retrieving user:", error);
              return res.status(500).json({ error: 'Internal Server Error' });
          }

          // Check if user with the provided username exists
          if (results.length === 0) {
              return res.status(401).json({ error: 'Invalid username or password' });
          }

          const user = results[0];

          // Log retrieved user and hashed password
          console.log("Retrieved user:", user);
          console.log("Retrieved hashed password from DB:", user.Pwd);

          // Compare the submitted password with the stored hashed password
          const passwordMatch = await bcrypt.compare(password, user.P);

          // If password is valid, generate JWT token and send it in the response
          if (passwordMatch) {
              console.log("Log In Successful...!");
              const userInfo = {
                  accountId: user.Account_Id,
                  username: user.Username
              };
              // Use a secure method to generate token secret
              const authToken = jwt.sign({ info: userInfo }, process.env.Special_Token, { expiresIn: '1h' });
              res.cookie('auth', authToken, { httpOnly: true, secure: true });
              return res.status(200).json({ success: true, token: authToken });
          } else {
              // If password is invalid, return error response
              return res.status(401).json({ error: 'Invalid username or password' });
          }
      });
  } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;