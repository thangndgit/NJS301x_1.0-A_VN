const express = require("express");
const orderCtrl = require("../controllers/order");
const { requireLogin } = require("../middlewares/auth");

const router = express.Router();

router.use(requireLogin);
router.get("/", orderCtrl.get);
router.post("/", orderCtrl.create);

module.exports = router;
