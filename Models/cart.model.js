const { default: mongoose } = require("mongoose");

// Cart Schema
const cartSchema = mongoose.Schema({
  id: { type: String, required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
