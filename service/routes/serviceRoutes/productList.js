
const db = require('../../../db/index');

function ProductList(req, res) {
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
}

module.exports = { ProductList };
