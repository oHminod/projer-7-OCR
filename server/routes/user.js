const express = require("express");
/**
 * Routes user.
 */
const user = express.Router();

const userLogin = require("../controllers/user/userLogin");
const userSignUp = require("../controllers/user/userSignUp");
const getUser = require("../controllers/user/getUser");
const setUser = require("../controllers/user/setUser");
const getAvatarAndPseudo = require("../controllers/user/getAvatarAndPseudo");

const multer = require("../middleware/multer-config");
const sessionOk = require("../middleware/session");

user.post("/signup", userSignUp);
user.post("/login", userLogin);
user.post("/setuser/:id", sessionOk, multer, setUser);
user.get("/membre/:id", sessionOk, getUser);
user.get("/posterinfo/:id", sessionOk, getAvatarAndPseudo);

module.exports = user;
