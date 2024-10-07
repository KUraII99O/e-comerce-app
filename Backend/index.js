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
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});