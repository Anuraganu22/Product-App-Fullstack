
const db = require('../../../db/index');

function insertProductRoute(req, res) {
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
}

module.exports = { insertProductRoute };
