const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  id: {
    type: String, // This will be a custom id (UUIDv4)

    unique: true,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    // Assuming each product is associated with a user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically update `updatedAt` on every save
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
