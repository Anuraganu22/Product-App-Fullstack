const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('loginapp.db');
const fs = require('fs');


db.serialize(() => {
  // Create the 'users' table if it doesn't exist
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
   // Create the 'products' table if it doesn't exist
   db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, image TEXT,productName TEXT, description TEXT, price REAL )');
});


module.exports = db;