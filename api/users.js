const express = require("express");
const { auth } = require("../middlewares");
const router = express.Router();
const usersTask = require("../controller/usersController");

router.get("/", usersTask.listUsers);

router.post("/signup", usersTask.signUp);

router.post("/login", auth, usersTask.logIn);

router.get("/current", usersTask.getCurrent);

router.get("/logout", auth, usersTask.logOut);

module.exports = router;
