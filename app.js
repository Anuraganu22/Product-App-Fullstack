const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const indexRoute = require('./service/routes/clientRoutes');
const serviceRoutes = require('./service/routes/serviceRoutes/auth');
const path = require('path');
const db = require('./db');
const { AppRoutes } = require('./service/constants');
const { productDatabase } = require('./db/CreateTableFromJson/BulksProducts/products');
const { addToWishlistRoute } = require('./service/routes/serviceRoutes/wishLists');
const viewWishlist = require('./service/routes/serviceRoutes/viewWishList');
const { ProductList } = require('./service/routes/serviceRoutes/productList');
const { DeleteWishList } = require('./service/routes/serviceRoutes/deleteWishList');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'my-secret-key', resave: true, saveUninitialized: true }));

app.use((req, res, next) => {
  if (req.url.endsWith('.js') || req.url.endsWith('.mjs')) {
    res.header('Content-Type', 'application/javascript');
  }
  next();
});

const staticFilesDirectory = path.join(__dirname, 'client');

app.use(express.static(staticFilesDirectory));

app.use('/', indexRoute);

app.use(AppRoutes.Base, serviceRoutes);

productDatabase()

app.post(AppRoutes.WishList, addToWishlistRoute);

app.get(AppRoutes.Products, ProductList);

app.get(AppRoutes.ViewWishList, viewWishlist)

app.delete(AppRoutes.DeleteWishListItem, DeleteWishList)

// app.delete('/users', (req, res) => {
//   db.serialize(() => {
//     db.run("DROP TABLE IF EXISTS users", (err) => {
//       if (err) {
//         console.error(err.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         res.json({ message: 'User table deleted successfully' });
//       }
//     });
//   });
// });

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
