const express = require("express");
const app = express.Router();
const authentication = require("../middleware/authentication");
const Order = require("../Models/order.model");

app.use(authentication);

// Get Order Data
app.get("/", async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.body.id })
      .populate("products.product")
      .populate("id");

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(order);
  } catch (e) {
    console.error("Error fetching order data:", e);
    res
      .status(500)
      .json({ msg: "Error fetching order data", error: e.message });
  }
});

// Place an Order
app.post("/done", async (req, res) => {
  const { id, product } = req.body;

  try {
    let order = await Order.findOne({ id });

    if (order) {
      // If the order exists, add products to the existing order
      order.products = [...order.products, ...product];
      try {
        await Order.findOneAndUpdate({ _id: order._id }, order);
        res.json({ msg: "Order placed successfully" });
      } catch (e) {
        console.error("Error updating order:", e);
        res.status(500).json({ msg: "Error updating order", error: e.message });
      }
    } else {
      // If the order doesn't exist, create a new one
      try {
        await Order.create({ id, products: [...product] });
        res.json({ msg: "Order placed successfully" });
      } catch (e) {
        console.error("Error creating order:", e);
        res.status(500).json({ msg: "Error creating order", error: e.message });
      }
    }
  } catch (e) {
    console.error("Error processing order:", e);
    res.status(500).json({ msg: "Error processing order", error: e.message });
  }
});

module.exports = app;
