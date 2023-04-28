const express = require("express");
const orderCtrl = require("../controllers/order");

const router = express.Router();

router.get("/", orderCtrl.get);
router.post("/", orderCtrl.create);

module.exports = router;
