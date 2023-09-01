const Joi = require("joi");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const secret = process.env.SECRET;

const joiSignupSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().required(),
    token: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});


