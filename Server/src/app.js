// Import base
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const hotelRoutes = require("./routes/hotel");
const tranRoutes = require("./routes/transaction");
const userRoutes = require("./routes/user");
const roomRoutes = require("./routes/room");

// Create server
const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Enable all CORS request
app.use(cors({ credentials: true, origin: true }));

// Use session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "matitmui",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Use passport
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/transaction", tranRoutes);
app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);

// Connect to database and run server
mongoose
  .connect(
    "mongodb+srv://matitmui:12345679@funix-njs101x-cluster.mvj9tlu.mongodb.net/njs301-asm2-booking?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

// Export the app
module.exports = app;
