const express = require("express");
const productCtrl = require("../controllers/product");
const { requireLogin } = require("../middlewares/auth");

const router = express.Router();

// Routes accessible to all users
router.get("/", productCtrl.getAll);
router.get("/:productId", productCtrl.getById);

// Routes that require authentication
router.use(requireLogin);
router.post("/", productCtrl.create);
router.put("/:productId", productCtrl.updateById);
router.delete("/:productId", productCtrl.deleteById);

module.exports = router;
