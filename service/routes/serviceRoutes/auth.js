const express = require("express");
const router = express.Router();
const db = require("../../../db");
const AppQueries = require("../../utils/queries");
const { AppRoutes } = require("../../constants");
const returnError = require("../../utils/errorHandler");
const { authenticateToken } = require("../../utils/authMiddileware");
const { addToWishlistRoute } = require("./wishLists");
const { ProductList } = require("./productList");
const viewWishlist = require("./viewWishList");
const { RegisterRouts, UserCheck } = require("./registerRouts");



//check if the user is already created
router.get(AppRoutes.GetUser, authenticateToken, UserCheck)

// Register endpoint
router.post(AppRoutes.RegisterUser, RegisterRouts)

//Add to wishList Api
// router.post( AppRoutes.WishList,addToWishlistRoute);

//Product List Api
// router.get(AppRoutes.Products, authenticateToken, ProductList);

// //ViewProductList Api
// router.get(AppRoutes.ViewWishList, viewWishlist)


router.delete('/users', (req, res) => {
  db.serialize(() => {
    db.run("DROP TABLE IF EXISTS users", (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'User table deleted successfully' });
      }
    });
  });
});

// delete endpoint

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
