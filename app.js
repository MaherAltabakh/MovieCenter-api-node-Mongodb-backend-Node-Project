// app.js
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Replace this with your MongoDB Atlas connection string
const dbConnectionString = config.get("db");

// Connect to MongoDB
mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Your Mongoose model and schema setup for the database collection (e.g., Genre, Movie, etc.)

// Define the route to display the database collection on the webpage
app.get("/", async (req, res) => {
  try {
    // Replace 'Genre' with your Mongoose model name
    const genres = await Genre.find();

    // Replace 'index' with the name of your EJS template file (e.g., 'genres' if you have genres.ejs)
    res.render("index", { genres });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data.");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
