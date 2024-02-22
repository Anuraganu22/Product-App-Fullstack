const db = require('../../../db/index');

const jwt = require("jsonwebtoken");
const jwtConfig = require("../../utils/jwtConfig");
const AppQueries = require('../../utils/queries');

// API to check if the user is already created
const UserCheck=(req, res) => {
    const { username, password } = req.body;
    // Query the database to check for the user
    db.get(AppQueries.GetAllUserQueries, [username], (err, row) => {
      if (err) {
        console.error("SQLite query error:", err);
        res.status(500).send("Internal Server Error");
      } else {
        if (row) {
          res.json(row);
        } else {
          res.send("Invalid username or password");
        }
      }
    });
}
  



const RegisterRouts=(req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      // Insert the new user into the 'users' table
      db.get(AppQueries.CheckUserExists, [username], (err, existingUser) => {
        if (err) {
          console.error("Error registering user:", err);
          res.status(500).send("Internal Server Error");
          returnError();
        } else if (existingUser) {
          res.status(400);
          res.json({ userAlreadyRegistered: true });
        } else {
          db.run(AppQueries.AddAUserQuery, [username, password], function (err) {
            if (err) {
              console.error("Error registering user:", err);
              res.status(500).send("Internal Server Error");
              returnError();
            } else {
              const userID = this.lastID; // Retrieve the last inserted row ID
              console.log(`User '${username}' with ID '${userID}' registered successfully.`);
              const token = jwt.sign(
                { username: username, userID: userID }, // Include the userID in the token payload
                jwtConfig.secretKey,
                {
                  expiresIn: jwtConfig.expiresIn,
                }
              );
              res.status(200);
              res.json({ success: true, token });
            }
          });
        }
  
  
      });
    } else {
      res.status(400);
      returnError();
    }
  }

    module.exports={RegisterRouts,UserCheck}
