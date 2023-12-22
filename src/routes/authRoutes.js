const express = require("express");
const { Model } = require("sequelize");
const router = express.Router();

const controller = require("../controllers/authController");

router.get("/register", controller.register);
router.post("/register", controller.postRegister);

router.get("/login", controller.login);
router.post("/login", controller.postLogin);

router.get("/logout", controller.logout);

module.exports = router;