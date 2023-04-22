const express = require("express");
const productCtrl = require("../controllers/product");

const router = express.Router();

router.get("/", productCtrl.getAll);
router.post("/", productCtrl.create);
router.get("/:productId", productCtrl.getById);
router.put("/:productId", productCtrl.updateById);

module.exports = router;
