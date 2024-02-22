const { deleteFromWishlist } = require("../../../db/CreateTableFromJson/wishListProducts/wishList");
const db = require('../../../db/index');


const DeleteWishList = async (req, res) => {
    const productId = parseInt(req.params.productId);
    console.log('productId',productId);
    const userId = parseInt(req.params.userId);
  
    try {
      const result = await deleteFromWishlist(productId, userId);
      res.json({ message: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { DeleteWishList };