const express = require("express");
const userLogin = require("../controllers/user/userLogin");
const userSignUp = require("../controllers/user/userSignUp");
const sessionOk = require("../middleware/session");
/**
 * Routes user.
 */
const user = express.Router();

const getUser = require("../controllers/user/getUser");
const setUser = require("../controllers/user/setUser");
const multer = require("../middleware/multer-config");

user.post("/signup", userSignUp);
user.post("/login", userLogin);
user.post("/setuser/:id", sessionOk, multer, setUser);
user.get("/membre/:id", sessionOk, getUser);

module.exports = user;
