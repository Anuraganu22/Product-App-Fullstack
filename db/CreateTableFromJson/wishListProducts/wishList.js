const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('loginapp.db');

const wishlistTable = () => {
  return new Promise((resolve, reject) => {
    // Create the 'wishlist' table
    db.run('CREATE TABLE IF NOT EXISTS wishlist (id INTEGER PRIMARY KEY, product_id INTEGER, user_id INTEGER, FOREIGN KEY(product_id) REFERENCES products(id), FOREIGN KEY(user_id) REFERENCES users(id))',
      (createWishlistError) => {
        if (createWishlistError) {
          reject(`Error creating 'wishlist' table: ${createWishlistError.message}`);
          return;
        }
        resolve('Wishlist table setup completed successfully.');
      });
  });
};

const addToWishlist = (productId, userId) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO wishlist (product_id, user_id) VALUES (?, ?)';
    db.run(query, [productId, userId], function (err) {
      if (err) {
        reject(`Error adding product to wishlist: ${err.message}`);
        return;
      }
      resolve(`Product added to wishlist with ID: ${this.lastID}`);
    });
  });
};

const deleteFromWishlist = (productId, userId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM wishlist WHERE product_id = ? AND user_id = ?';
    db.run(query, [productId, userId], function (err) {
      if (err) {
        reject(`Error deleting product from wishlist: ${err.message}`);
        return;
      }
      
      // Check if this.changes is 0, indicating that the product was not found
      if (this.changes === 0) {
        resolve('Product not found in the wishlist.');
      } else {
        resolve('Product deleted from wishlist successfully.');
      }
    });
  });
};




module.exports = { wishlistTable, addToWishlist, deleteFromWishlist };
