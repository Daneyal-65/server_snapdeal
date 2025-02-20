const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const Cart = require("../Models/cart.model");

router.use(authentication);
async function getCartItem(id, lebal = "") {
  const cart = await Cart.findOne({ id: id }).populate("products.product");
  // console.log(cart);
  if (cart) {
    return cart.products;
  }
  return [];
}
// Get Cart Data
router.get("/", async (req, res) => {
  // console.log("hit");
  try {
    const cart = await Cart.findOne({ id: req.body.id }).populate(
      "products.product"
    );

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    res.json({ cart: cart.products, msg: "Cart products retrieved" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Add to Cart
router.post("/addToCart", async (req, res) => {
  const { id, product } = req.body;

  try {
    let cart = await Cart.findOne({ id });

    if (cart) {
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === product.product
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push(product);
      }

      await cart.save();
      const newCart = await getCartItem(id);
      return res.json({ msg: "Cart updated successfully", cart: newCart });
    }

    cart = await Cart.create({ id, products: [product] });
    const newCart = await getCartItem(id);
    res.json({ msg: "Product added to cart", cart: newCart });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete a product from cart
router.patch("/delete", async (req, res) => {
  const { id, productId } = req.body;

  try {
    const result = await Cart.updateOne(
      { id },
      { $pull: { products: { product: productId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ msg: "Product not found in cart" });
    }
    const newCart = await getCartItem(id);
    res.json({ msg: "Product added to cart", cart: newCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product quantity
router.patch("/update", async (req, res) => {
  const { id, quantity, productId } = req.body;

  // console.log(req.body);
  if (!productId && !quantity) {
    res.status(500).json({ msg: "productId  or Quantity not defined" });
  }
  try {
    const result = await Cart.updateOne(
      { id, "products.product": productId },
      { $set: { "products.$.quantity": quantity } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ msg: "Product not found in cart" });
    }
    // const cart = await Cart.findOne({ id: req.body.id }).populate(
    //   "products.product"
    // );
    // console.log(cart);
    const newCart = await getCartItem(id);
    res.json({ msg: "Product added to cart", cart: newCart });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Remove entire cart
router.delete("/removeCart", async (req, res) => {
  const { id } = req.body;

  try {
    const result = await Cart.deleteOne({ id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    res.json({ msg: "Cart removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
