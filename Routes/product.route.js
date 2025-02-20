const express = require("express");
const router = express.Router();
const Product = require("../Models/product.model");

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const { subCategory } = req.query;

    // console.log("Category:", category, "SubCategory:", subCategory);

    // Fetching products based on category and subCategory (optional filtering)
    const filter = {};
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    const data = await Product.find(filter);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "Error fetching products", details: error.message });
  }
});

// Get product by ID
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product", details: error });
  }
});

// Add a new product
// router.post("/add", async (req, res) => {
//   // const trending = [

//   //   {
//   //     name: "Nike Air Zoom Pegasus 39",
//   //     price: 129.99,
//   //     offPrice: 90,
//   //     image:
//   //       "https://images-cdn.ubuy.co.in/653856ae7dd04070b012af4f-nike-women-39-s-air-zoom-pegasus-39.jpg",
//   //     rating: {
//   //       rate: 4.5,
//   //       count: 230,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "shoes",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "Adidas Ultraboost 22",
//   //     price: 149.99,
//   //     offPrice: 104,
//   //     image: "https://m.media-amazon.com/images/I/61hgDVyPu+L._AC_UY1000_.jpg",
//   //     rating: {
//   //       rate: 4.7,
//   //       count: 190,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "shoes",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "Puma RS-X Bold",
//   //     price: 109.99,
//   //     offPrice: 76,
//   //     image:
//   //       "https://www.puma-catchup.com/wp-content/uploads/2019/09/RS-X-Bold_H.jpg",
//   //     rating: {
//   //       rate: 4.2,
//   //       count: 160,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "shoes",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "Reebok Nano X3",
//   //     price: 119.99,
//   //     offPrice: 83,
//   //     image:
//   //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLYoNIMVJaGmCHHmf-cNOAwmpD2k_hPedFGg&s",
//   //     rating: {
//   //       rate: 4.6,
//   //       count: 145,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "shoes",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "Under Armour HOVR Sonic 4",
//   //     price: 99.99,
//   //     offPrice: 69,
//   //     image:
//   //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYlQgfOJx2Lq0eCvg5mcXPJpT3RNP3fsgeMQ&s",
//   //     rating: {
//   //       rate: 4.3,
//   //       count: 180,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "shoes",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "ASICS Gel-Kayano 29",
//   //     price: 159.99,
//   //     offPrice: 111,
//   //     image:
//   //       "https://www.asics.co.in/media/catalog/product/1/0/1011b440_404_sr_rt_glb-base.jpg",
//   //     rating: {
//   //       rate: 4.8,
//   //       count: 220,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "shoes",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "New Balance Fresh Foam 1080v12",
//   //     price: 139.99,
//   //     offPrice: 97,
//   //     image:
//   //       "https://images-cdn.ubuy.co.in/66c574577d8e162fcf6d39ca-new-balance-men-39-s-fresh-foam-x-1080.jpg",
//   //     rating: {
//   //       rate: 4.4,
//   //       count: 170,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "shoes",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "Skechers Go Run Razor 3",
//   //     price: 89.99,
//   //     offPrice: 62,
//   //     image: "https://m.media-amazon.com/images/I/71HqTLmRcEL._SX625_.jpg",
//   //     rating: {
//   //       rate: 4.1,
//   //       count: 140,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "shoes",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "Mizuno Wave Rider 26",
//   //     price: 129.99,
//   //     offPrice: 90,
//   //     image:
//   //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyT1hiajch0O3dCbtgBYVE0aLyb5AcaBpyjA&s",
//   //     rating: {
//   //       rate: 4.5,
//   //       count: 200,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "shoes",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "Salomon Speedcross 5",
//   //     price: 139.99,
//   //     offPrice: 97,
//   //     image: "https://m.media-amazon.com/images/I/81sScaGAs9L._AC_UY1000_.jpg",
//   //     rating: {
//   //       rate: 4.7,
//   //       count: 210,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "shoes",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "Chef's Knife",
//   //     price: 79.99,
//   //     offPrice: 55,
//   //     image:
//   //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzMizIGuHd0Qv_mGnzNN5CNL0dg7o_G26SjA&s",
//   //     rating: {
//   //       rate: 4.5,
//   //       count: 250,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "Kitchen",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "Non-Stick Frying Pan",
//   //     price: 29.99,
//   //     offPrice: 20,
//   //     image: "https://m.media-amazon.com/images/I/81COU6udPbL.jpg",
//   //     rating: {
//   //       rate: 4.2,
//   //       count: 380,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "Kitchen",
//   //     subCategory: "trending",
//   //   },
//   //   {
//   //     name: "Stand Mixer",
//   //     price: 399.99,
//   //     offPrice: 279,
//   //     image:
//   //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT83MnH12V4tfuJOK2bqk7cZshHaTEy-wJZ3Q&s",
//   //     rating: {
//   //       rate: 4.8,
//   //       count: 180,
//   //     },
//   //     size: ["v1", "v2"],
//   //     category: "Kitchen",
//   //     subCategory: "trending",
//   //   },
//   // ];

//   const allData = await Product.updateMany({}, [
//     {
//       $set: {
//         price: { $multiply: ["$price", 80] },
//       },
//     },
//   ]);

//   console.log(allData);
//   res.json({ msg: "hi sameer !" });
//   // try {
//   //   await Product.insertMany(trending);
//   //   res.status(201).json({ message: "Product added successfully" });
//   // } catch (error) {
//   //   res.status(500).json({ error: "Error adding product", details: error });
//   // }
// });

// Update product by ID
router.patch("/edit/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ error: "Error updating product", details: error });
  }
});

// Delete product by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product", details: error });
  }
});

// Search and paginate products
router.get("/", async (req, res) => {
  try {
    const { page = 1, search } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    let filter = search ? { name: { $regex: search, $options: "i" } } : {};
    let catFilter = search
      ? { category: { $regex: search, $options: "i" } }
      : {};

    const products = await Product.find(filter).limit(limit).skip(skip);
    const catProducts = await Product.find(catFilter).limit(limit).skip(skip);
    res.status(200).json([...products, ...catProducts]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products", details: error });
  }
});

module.exports = router;
