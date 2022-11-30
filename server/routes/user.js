const express = require("express");
/**
 * Routes user.
 */
const user = express.Router();

const { xss } = require("express-xss-sanitizer");
const userLogin = require("../controllers/user/userLogin");
const userSignUp = require("../controllers/user/userSignUp");
const getUser = require("../controllers/user/getUser");
const setUser = require("../controllers/user/setUser");
const searchUser = require("../controllers/user/searchUser");
const ajouterAmi = require("../controllers/user/ajouterAmi");
const retirerAmi = require("../controllers/user/retirerAmi");
const accepterAmi = require("../controllers/user/accepterAmi");
const refuserAmi = require("../controllers/user/refuserAmi");
const annulerDemande = require("../controllers/user/annulerDemande");
const getUsersInfo = require("../controllers/user/getUsersInfo");

const multer = require("../middleware/multer-config");
const sessionOk = require("../middleware/session");

user.post("/signup", xss(), userSignUp);
user.post("/login", xss(), userLogin);
user.post("/search", sessionOk, xss(), searchUser);
user.post("/getUsersInfo", sessionOk, xss(), getUsersInfo);
user.post("/setuser/:id", sessionOk, xss(), multer, setUser);
user.get("/friends/add/:id", sessionOk, ajouterAmi);
user.get("/friends/remove/:id", sessionOk, retirerAmi);
user.get("/friends/accept/:id", sessionOk, accepterAmi);
user.get("/friends/reject/:id", sessionOk, refuserAmi);
user.get("/friends/cancel/:id", sessionOk, annulerDemande);
user.get("/membre/:id", sessionOk, getUser);

module.exports = user;
