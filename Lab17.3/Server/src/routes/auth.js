const express = require("express");
const authCtrl = require("../controllers/auth");
const validators = require("../middlewares/validators");
const { requireLogin } = require("../middlewares/auth");

const router = express.Router();

router.post("/sign-in", validators.signIn, authCtrl.signIn);
router.post("/sign-up", validators.signUp, authCtrl.signUp);
router.post("/sign-out", requireLogin, authCtrl.signOut);

module.exports = router;
