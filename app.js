
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const indexRoute = require('./service/routes/clientRoutes');
const serviceRoutes = require('./service/routes/serviceRoutes/auth');
const path = require('path');
const sqlite3 = require('sqlite3');
const {AppRoutes} = require('./service/constants');
const PassportInstance = require('./service/utils/passport');
const db = require('./db');
const { productDatabase } = require('./db/CreateTableFromJson/BulksProducts/products');
const { wishlistTable,addToWishlist } = require('./db/CreateTableFromJson/wishListProducts/wishList');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'my-secret-key', resave: true, saveUninitialized: true }));



// Add a middleware to set the correct Content-Type for JavaScript files
app.use((req, res, next) => {
  if (req.url.endsWith('.js') || req.url.endsWith('.mjs')) {
    res.header('Content-Type', 'application/javascript');
  }
  next();
});

// servers to provide html
const staticFilesDirectory = path.join(__dirname, 'client');
app.use(express.static(staticFilesDirectory));
app.use('/', indexRoute);

// server provides endpoints
app.use(AppRoutes.Base, serviceRoutes);


// Call the setupDatabase function
productDatabase()
  .then((message) => {
    console.log(message);
    return wishlistTable();
  })
  .then((wishlistMessage) => {
    console.log(wishlistMessage);


// Endpoint to insert product data
app.post('/products', PassportInstance.authenticate(), (req, res) => {
  // Ensure that only authenticated users can add products
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { image, description, price, title, productName } = req.body;

  if (!image || !description || !price || !title || !productName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO products (image, description, price, title, productName) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [image, description, price, title, productName], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      success: true,
      productId: this.lastID,
    });
  });
});
});


 // Endpoint to add a product to the wishlist
 app.post('/wishlist', async (req, res) => {
  const { productId, userId } = req.body;

  if (!productId || !userId) {
    return res.status(400).json({ error: 'Product ID and User ID are required' });
  }

  try {
    // Call addToWishlist function to add the product to the wishlist
    const result = await addToWishlist(productId, userId);

    res.json({
      success: true,
      message: result,
    });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



 // Endpoint to  Productslist

app.get('/productslist', (req, res) => {
  const query = 'SELECT * FROM products';

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      success: true,
      products: rows,
    });
  });
});







//start server
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
