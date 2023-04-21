const express = require("express");
const userCtrl = require("../controllers/user");

const router = express.Router();

router.get("/", userCtrl.getAll);
router.post("/", userCtrl.create);

module.exports = router;
