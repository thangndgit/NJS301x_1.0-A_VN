const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("<p>The Middleware that handles just /</p>"));
app.get("/users", (req, res) => res.send("<p>The Middleware that handles just /users</p>"));

app.listen(port, () => console.log("Server is running on port " + port));
