const express = require("express");
const cors = require("cors");
const userRte = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRte);

app.listen(5000, () => console.log("Server is running at port 5000"));
