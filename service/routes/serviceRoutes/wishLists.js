
const db = require('../../../db/index');
const { addToWishlist } = require('../../../db/CreateTableFromJson/wishListProducts/wishList');

async function addToWishlistRoute(req, res) {
  const { productId, userId } = req.body;

  if (!productId || !userId) {
    return res.status(400).json({ error: 'Product ID and User ID are required' });
  }

  try {
    const result = await addToWishlist(productId, userId);

    res.json({
      success: true,
      message: result,
    });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { addToWishlistRoute };
