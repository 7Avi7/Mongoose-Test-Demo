// Import required modules
const express = require("express");
const mongoose = require("mongoose");

// Create Express app
const app = express();

// Body parser middleware
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://avilash1:avi123@cluster0.kh0rv7w.mongodb.net/test_demo?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Create mongoose schema for product
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

// Create mongoose model
const Product = mongoose.model("Product", ProductSchema);

// Routes

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new product
app.post("/api/products", async (req, res) => {
  const { name, price, description, category, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image,
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
