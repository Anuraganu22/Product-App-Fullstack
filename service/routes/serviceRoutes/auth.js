const express = require("express");
const router = express.Router();
const db = require("../../../db");
const AppQueries = require("../../utils/queries");
const { AppRoutes } = require("../../constants");
const returnError = require("../../utils/errorHandler");
const PassportInstance = require("../../utils/passport");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../utils/jwtConfig");
const { authenticateToken } = require("../../utils/authMiddileware");

// API to check if the user is already created
router.get(AppRoutes.GetUser, (req, res) => {
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
});

// Register endpoint
router.post(AppRoutes.RegisterUser, (req, res) => {
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
        db.run(AppQueries.AddAUserQuery, [username, password], (err) => {
          if (err) {
            console.error("Error registering user:", err);
            res.status(500).send("Internal Server Error");
            returnError();
          } else {
            const token = jwt.sign(
              { username: username },
              jwtConfig.secretKey,
              {
                expiresIn: jwtConfig.expiresIn,
              }
            );
            res.status(200);
            res.json({ success:true , token });
          }
        });
      }
    });
  } else {
    res.status(400);
    returnError();
  }
});
// Register endpoint
router.delete(AppRoutes.DeleteUser, (req, res) => {
  const userId = req.params.id;
  if (userId) {
    // Insert the new user into the 'users' table
    db.run(AppQueries.DeleteAUserQuery, [userId], function (err) {
      if (err) {
        console.error("Error deleteing user:", err);
        returnError();
        res.status(500).send("Internal Server Error");
      } else {
        const changes = this.changes; 
        if (changes > 0) {
          res.json({
            success: true,
            message: "User deleted successfully",
            changes,
          });
        } else {
          res.status(404).json({ success: false, message: "User not found" });
        }
      }
    });
  } else {
    res.status(400);
    returnError();
  }
});

module.exports = router;
