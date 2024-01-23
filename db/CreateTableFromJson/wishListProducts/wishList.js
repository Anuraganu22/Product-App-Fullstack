const sqlite3 = require('sqlite3');

const wishlistTable=()=> {
  const db = new sqlite3.Database('loginapp.db');

  return new Promise((resolve, reject) => {
    // Drop the existing 'wishlist' table if it exists
    db.run('DROP TABLE IF EXISTS wishlist', (dropError) => {
      if (dropError) {
        reject(`Error dropping 'wishlist' table: ${dropError.message}`);
        return;
      }

      // Create the 'wishlist' table
      db.run('CREATE TABLE IF NOT EXISTS wishlist (id INTEGER PRIMARY KEY, product_id INTEGER, user_id INTEGER, FOREIGN KEY(product_id) REFERENCES products(id), FOREIGN KEY(user_id) REFERENCES users(id))',
       (createWishlistError) => {
        if (createWishlistError) {
          reject(`Error creating 'wishlist' table: ${createWishlistError.message}`);
          return;
        }

        resolve('Wishlist table setup completed successfully.');

        // Close the database connection
        db.close((closeError) => {
          if (closeError) {
            console.error(`Error closing database connection: ${closeError.message}`);
          }
        });
      });
    });
  });
}

const  addToWishlist=(productId, userId)=> {
  const db = new sqlite3.Database('loginapp.db');

  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO wishlist (product_id, user_id) VALUES (?, ?)';
    db.run(query, [productId, userId], function (err) {
      if (err) {
        reject(`Error adding product to wishlist: ${err.message}`);
        return;
      }

      resolve(`Product added to wishlist with ID: ${this.lastID}`);

      // Close the database connection
      db.close((closeError) => {
        if (closeError) {
          console.error(`Error closing database connection: ${closeError.message}`);
        }
      });
    });
  });
}

module.exports = { wishlistTable, addToWishlist };
