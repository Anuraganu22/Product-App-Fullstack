// In your wishlist.js file
const db = require('../../../db/index');

function viewWishlist(req, res) {
  const userId = req.params.userId;
  const query = 'SELECT * FROM wishlist WHERE user_id = ?';
  console.log('userId',userId);

  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      success: true,
      wishlist: rows,
    });
  });
}

module.exports = viewWishlist;
