const express = require("express");
const productCtrl = require("../controllers/product");
const validators = require("../middlewares/validators");
const { requireLogin } = require("../middlewares/auth");

const router = express.Router();

// Routes accessible to all users
router.get("/", productCtrl.getAll);
router.get("/:productId", productCtrl.getById);

// Routes that require authentication
router.use(requireLogin);
router.post("/", validators.editProduct, productCtrl.create);
router.put("/:productId", validators.editProduct, productCtrl.updateById);
router.delete("/:productId", productCtrl.deleteById);

module.exports = router;
