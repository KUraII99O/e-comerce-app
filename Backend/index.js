require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json()); // Body parsing middleware
app.use(cors()); // Enable CORS



const PORT = process.env.PORT || 3000;


mongoose
  .connect(
    "mongodb+srv://farees:azertyU123@ecomerce.t0u3c.mongodb.net/ecomerce?retryWrites=true&w=majority&appName=ecomerce",
    { connectTimeoutMS: 30000}
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database", err));



 // Define User model
const User = require("./models/User"); // Adjust path if needed
const Store = require("./models/Store"); // Adjust path if needed

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


app.get('/api/users', (req, res) => {
    res.json(users);
  });
  

// Register Route
app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;
  
  // Check if user exists in memory (or eventually from DB)
  const userExists = users.some((u) => u.email === email);

  if (userExists) {
    return res.status(400).json({ error: `User with email ${email} already exists` });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const userId = uuidv4(); // Generate UUID for user ID
  const type = "user"; // Default user type

  const newUser = new User({
    id: userId,
    email,
    username,
    password: hashedPassword,
    type,
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
      // Check in-memory array first
      const userInMemory = users.find((u) => u.email === email);
      if (userInMemory) {
        const isMatch = await bcrypt.compare(password, userInMemory.password);
        if (isMatch) {
          return res.status(200).json({
            message: "Login successful (in memory)",
            user: userInMemory,
          });
        }
      }
  
      // If not found in-memory, check MongoDB
      const userInMongoDB = await User.findOne({ email });
      if (userInMongoDB) {
        const isMatch = await bcrypt.compare(password, userInMongoDB.password);
        if (isMatch) {
          return res
            .status(200)
            .json({ message: "Login successful (MongoDB)", user: userInMongoDB });
        }
      }
  
      return res.status(400).json({ error: "Invalid email or password" });
    } catch (err) {
      console.error("Login failed:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  ("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

  // Endpoint to add a store
app.post("/api/stores", async (req, res) => {
  try {
    const newStore = new Store({ ...req.body });
    await newStore.save(); // Save store to MongoDB

    stores.push(newStore); // Add store to in-memory array (optional)

    res.status(201).json({ message: "Store added successfully", store: newStore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get stores
app.get("/api/stores", async (req, res) => {
  try {
    let stores = await Store.find();
    const { storeId } = req.query;
    let result;
    if (storeId) {
      result = stores.filter((store) => store.storeId === storeId);
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

    const updatedStoreMongo = await Store.findOneAndUpdate({ id }, updatedStore, {
      new: true,
    });

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

// Endpoint to delete a store
app.delete("/api/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Store.findOneAndDelete({ id }); // Delete from MongoDB

    const index = stores.findIndex((store) => store.id === id);
    if (index !== -1) {
      const deletedStore = stores.splice(index, 1)[0]; // Delete from in-memory (optional)
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});