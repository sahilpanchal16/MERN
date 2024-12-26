const { manData } = require("../models/man");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imgPath = path.join(__dirname, "../imgs");
    if (!fs.existsSync(imgPath)) fs.mkdirSync(imgPath);
    cb(null, imgPath);
  },
  filename: (req, file, cb) => {
    const prefix = Date.now() + "-" + Math.round(Math.random() * 100000);
    cb(null, prefix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only images are allowed."));
    }
    cb(null, true);
  },
});

// Create Product
const createman = async (req, res) => {
  try {
    // Validate if user is authenticated
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not authenticated." });
    }

    const { man_name, price, category } = req.body;
    const user = req.user.id; 
    const poster = req.file ? req.file.filename : "";

    // Validate required fields
    if (!man_name || !price) {
      return res
        .status(400)
        .json({
          error: "Missing required fields: man_name and price are mandatory.",
        });
    }

    const newMan = new manData({
      man_name,
      price,
      poster,
      category: category || "Men",
      user, // Adding the user ID for tracking
    });

    const savedMan = await newMan.save();
    res
      .status(201)
      .json({ msg: "Product created successfully", data: savedMan });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch Products
const getman = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not authenticated." });
    }

    // Fetch products for the authenticated user
    const products = await manData.find({ user: req.user.id });
    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Update Product
// Update Product
const updateman = async (req, res) => {
  try {
    const { id } = req.params;
    const { man_name, price } = req.body;
    const poster = req.file ? req.file.filename : null;

    // Ensure the product belongs to the logged-in user
    const man = await manData.findOne({ _id: id, user: req.user.id });

    if (!man) {
      return res
        .status(404)
        .json({ error: "Product not found or unauthorized access." });
    }

    const updateData = { man_name, price };
    if (poster) updateData.poster = poster;

    const updatedMan = await manData.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({ msg: "Product updated successfully", data: updatedMan });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Product
// Delete Product
const deleteman = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the product belongs to the logged-in user

    if (!man) {
      return res
        .status(404)
        .json({ error: "Product not found or unauthorized access." });
    }

    // Delete the associated image if it exists
    if (man.poster) {
      const posterPath = path.join(__dirname, "../imgs", man.poster);
      if (fs.existsSync(posterPath)) fs.unlinkSync(posterPath);
    }

    await manData.deleteOne({ _id: id });
    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { createman, getman, updateman, deleteman, upload };
