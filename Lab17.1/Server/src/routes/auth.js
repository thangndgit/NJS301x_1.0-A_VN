const express = require("express");
const authCtrl = require("../controllers/auth");

const router = express.Router();

router.post("/sign-in", authCtrl.signIn);
router.post("/sign-up", authCtrl.signUp);
router.post("/sign-out", authCtrl.signOut);

module.exports = router;
