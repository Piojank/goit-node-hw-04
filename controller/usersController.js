const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../schemas/user')
require('dotenv').config()
const secret = process.env.SECRET