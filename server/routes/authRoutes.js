const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.get("/auth/google/callback", authController.googleCallback);

router.get("/login/success", authController.loginSuccess);

router.get("/logout", authController.logout);

module.exports = router;
