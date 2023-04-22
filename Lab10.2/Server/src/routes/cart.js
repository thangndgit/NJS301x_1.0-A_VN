const express = require("express");
const cartCtrl = require("../controllers/cart");

const router = express.Router();

router.get("/", cartCtrl.get);
router.put("/", cartCtrl.update);

module.exports = router;
