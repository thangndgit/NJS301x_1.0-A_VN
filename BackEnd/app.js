// Import base
const express = require("express");
const bodyParser = require("body-parser");

// Import routes
const movieRoutes = require("./routes/movie");

// Import middleware
const verifyToken = require("./middleware/verifyToken");

// Create app
const app = express();

// Use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Verify token
app.use("*", verifyToken);

// Use routes
app.use(movieRoutes);

// Handle route not found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(8080);
