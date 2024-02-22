const express = require("express");
const router = express.Router();
const path = require("path");
const { ClientRoutes } = require("../../constants");

const clientPath = path.join(__dirname, "../../../client");

router.get(ClientRoutes.Base, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});


router.get(ClientRoutes.Login, (req, res) => {
  res.sendFile(path.join(clientPath, "AuthPages/login/login.html"));
});


router.get(ClientRoutes.Home, (req, res) => {
  res.sendFile(path.join(clientPath, "AuthPages/home/home.html"));
});
router.get(ClientRoutes.Order, (req, res) => {
  res.sendFile(path.join(clientPath, "AuthPages/home/order.html"));
});

router.get(ClientRoutes.Cart, (req, res) => {
  res.sendFile(path.join(clientPath, "AuthPages/cart/cart.html"));
});
router.get(ClientRoutes.WishList, (req, res) => {
  res.sendFile(path.join(clientPath, "AuthPages/WishListPage/WishListPage.html"));
});


module.exports = router;
