const express = require("express");
const { auth, validation } = require("../middlewares");
const router = express.Router();
const usersTask = require("../controller/usersController");
const { joiSignupSchema, joiLoginSchema } = require("../service/schemas/userSchema");

router.get("/", usersTask.listUsers);

router.post("/signup", validation(joiSignupSchema), usersTask.signUp);

router.post("/login", validation(joiLoginSchema), usersTask.logIn);

router.get("/current", auth, usersTask.getCurrent);

router.get("/logout", auth, usersTask.logOut);

module.exports = router;
