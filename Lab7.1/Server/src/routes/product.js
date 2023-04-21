const express = require("express");
const productCtrl = require("../controllers/product");

const router = express.Router();

router.get("/", productCtrl.getAll);
router.post("/", productCtrl.create);

module.exports = router;
