


const sqlite3 = require('sqlite3');
const fs = require('fs');

const productDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('loginapp.db');

    // Drop the existing 'products' table if it exists
    db.run('DROP TABLE IF EXISTS products', (dropError) => {
      if (dropError) {
        reject(`Error dropping table: ${dropError.message}`);
        return;
      }

      // Create the 'products' table
      db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, image TEXT, description TEXT, price REAL, title TEXT, productName TEXT)', (createError) => {
        if (createError) {
          reject(`Error creating table: ${createError.message}`);
          return;
        }

        // Begin a transaction
        db.run('BEGIN TRANSACTION', (beginError) => {
          if (beginError) {
            reject(`Error beginning transaction: ${beginError.message}`);
            return;
          }

          // Read new data from the JSON file
          const newJsonData = fs.readFileSync('products.json');
          const newProductsData = JSON.parse(newJsonData);

          // Insert new data into the 'products' table
          const insertStatement = db.prepare('INSERT INTO products (image, description, price, title, productName) VALUES (?, ?, ?, ?, ?)');

          try {
            newProductsData.forEach(product => {
              insertStatement.run(product.image, product.description, product.price, product.title, product.productName);
            });

            // Commit the transaction
            db.run('COMMIT', (commitError) => {
              if (commitError) {
                reject(`Error committing transaction: ${commitError.message}`);
                return;
              }

              resolve('New products data inserted successfully.');
            });
          } catch (insertError) {
            // If an error occurs, rollback the transaction
            db.run('ROLLBACK', () => {
              reject(`Error inserting new products data: ${insertError.message}`);
            });
          } finally {
            // Finalize the prepared statement
            insertStatement.finalize();

            // Close the database connection
            db.close((closeError) => {
              if (closeError) {
                reject(`Error closing database connection: ${closeError.message}`);
              }
            });
          }
        });
      });
    });
  });
};

module.exports = { productDatabase };

