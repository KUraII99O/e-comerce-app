require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const app = express();
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken package
const secretKey = "azertyU123"; // Replace with your own secret key
// Middleware
app.use(express.json({ limit: "10mb" })); // Set JSON payload limit to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Set URL-encoded payload limit to 10MB
app.use(cors()); // Enable CORS

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://farees:azertyU123@ecomerce.t0u3c.mongodb.net/ecomerce?retryWrites=true&w=majority&appName=ecomerce",
    { connectTimeoutMS: 30000 }
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database", err));



  // Utility function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user.id },
    secretKey,
    { expiresIn: '1h' }
  );
};

// Utility function to check password
const checkPassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

// Define User model
const User = require("./models/User"); // Adjust path if needed
const Store = require("./models/Store"); // Adjust path if needed
const Product = require("./models/Product"); // Adjust path if needed

// Predefined users array
const adminhash = bcrypt.hashSync("adminpassword", 10);
const users = [
  {
    id: uuidv4(),
    username: "admin",
    email: "admin@admin.com",
    password: adminhash,
    type: "admin",
    Image: "https://picsum.photos/200/300",
  },
];
const stores = [];

app.get("/api/users", (req, res) => {
  res.json(users);
});

// Register Route
app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;

  // Check if user exists in memory (or eventually from DB)
  const userExists = users.some((u) => u.email === email);

  if (userExists) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists` });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const userId = uuidv4(); // Generate UUID for user ID
  const userType = "buyer"; // Default user type

  const newUser = new User({
    id: userId,
    email,
    username,
    password: hashedPassword,
    userType,
  });

  // Save new user to MongoDB
  try {
    await newUser.save();
    console.log("User saved to MongoDB");

    // Push to in-memory users array (you may want to remove this if using MongoDB as primary storage)
    users.push(newUser);

    // Respond with success
    res.status(200).json({
      message: "Sign up successful",
      user: newUser,
    });
  } catch (err) {
    console.error("Error saving user to MongoDB", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check in-memory or MongoDB for the user
    const user = users.find((u) => u.email === email) || await User.findOne({ email });
    
    let responseMessage = { error: "Invalid email or password" };
    let statusCode = 400;

    if (user) {
      // Check if the password matches
      const isMatch = await checkPassword(password, user.password);
      if (isMatch) {
        // Generate token and prepare successful login response
        const token = generateToken(user);

        responseMessage = {
          message: `Login successful (${user.hasOwnProperty('id') ? 'MongoDB' : 'in memory'})`,
          user: user,
          token: token,
        };
        statusCode = 200;
      }
    }

    // Return final response
    return res.status(statusCode).json(responseMessage);

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

// Endpoint to add a store

app.post("/api/stores", async (req, res) => {
  try {
    // Create a new store with a custom id and other properties from req.body
    const newStore = new Store({
      id: uuidv4(), // Generate a new unique id for the store
      ...req.body, // Spread the other fields from the request body
    });

    await newStore.save(); // Save the store to MongoDB

    stores.push(newStore); // Add store to in-memory array (optional)

    res
      .status(201)
      .json({ message: "Store added successfully", store: newStore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get stores
app.get("/api/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findOne({ id }); // Find the store by its ID
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.json(store); // Send the store data as a response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/stores", async (req, res) => {
  try {
    let stores = await Store.find();
    const { userId } = req.query;
    let result;
    if (userId) {
      result = stores.filter((store) => store.userId === userId);
    } else {
      result = stores; // Return all stores (in-memory)
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to edit a store
app.put("/api/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStore = req.body;

    const updatedStoreMongo = await Store.findOneAndUpdate(
      { id },
      updatedStore,
      {
        new: true,
      }
    );

    const index = stores.findIndex((store) => store.id === id);
    if (index !== -1) {
      stores[index] = updatedStore; // Update in-memory store (optional)
    }

    res.json({
      message: "Store data updated successfully",
      store: updatedStoreMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStore = await Store.findOneAndDelete({ id }); // Use findOneAndDelete

    if (deletedStore) {
      res.json({ message: "Store deleted successfully", store: deletedStore });
    } else {
      res.status(404).json({ error: "Store not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to toggle store status
app.put("/api/stores/:id/toggle-status", async (req, res) => {
  try {
    const { id } = req.params;
    let stores = await Store.find();
    const store = stores.find((store) => store.id === id);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    // Toggle status
    store.status = !store.status;
    await store.save();

    res.json({
      message: "Store status toggled successfully",
      store: store,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Endpoint to add a product
app.post("/api/products", async (req, res) => {
  try {
    // Create a new product with a custom id and other properties from req.body
    const newProduct = new Product({
      id: uuidv4(), // Generate a new unique id for the product
      ...req.body, // Spread the other fields from the request body
    });

    await newProduct.save(); // Save the product to MongoDB

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get a specific product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id }); // Find the product by its ID
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product); // Send the product data as a response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get all products or filter by userId
app.get("/api/products", async (req, res) => {
  try { 
    let products = await Product.find();
    const { userId ,storeId } = req.query;
    let result;
    if (storeId ) {
      result = products.filter((product) => product.storeId === storeId);
    } else if(userId ){
      result = products.filter((product) => product.userId === userId); // Return all products
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to edit a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;

    const updatedProductMongo = await Product.findOneAndUpdate(
      { id },
      updatedProduct,
      {
        new: true,
      }
    );

    res.json({
      message: "Product data updated successfully",
      product: updatedProductMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ id }); // Use findOneAndDelete

    if (deletedProduct) {
      res.json({ message: "Product deleted successfully", product: deletedProduct });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
