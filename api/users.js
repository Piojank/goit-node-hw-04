const express = require("express");
const router = express.Router();
const usersTask = require("../controller/usersController");

router.get("/", usersTask.listUsers);

router.post("/signup", usersTask.signUp);

router.post("/login", usersTask.logIn);

router.get("/current", usersTask.getCurrent);

router.get("/logout", usersTask.logOut);

module.exports = router;
