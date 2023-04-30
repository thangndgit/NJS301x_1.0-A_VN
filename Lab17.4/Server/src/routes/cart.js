const express = require("express");
const cartCtrl = require("../controllers/cart");
const { requireLogin } = require("../middlewares/auth");

const router = express.Router();

router.use(requireLogin);
router.get("/", cartCtrl.get);
router.put("/", cartCtrl.update);

module.exports = router;
