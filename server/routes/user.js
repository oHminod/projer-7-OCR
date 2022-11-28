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
const getAllUsers = require("../controllers/user/getAllUsers");
const searchUser = require("../controllers/user/searchUser");
const ajouterAmi = require("../controllers/user/ajouterAmi");
const retirerAmi = require("../controllers/user/retirerAmi");
const accepterAmi = require("../controllers/user/accepterAmi");
const refuserAmi = require("../controllers/user/refuserAmi");
const annulerDemande = require("../controllers/user/annulerDemande");
const getUsersInfo = require("../controllers/user/getUsersInfo");

const multer = require("../middleware/multer-config");
const sessionOk = require("../middleware/session");

user.post("/signup", userSignUp);
user.post("/login", userLogin);
user.post("/search", sessionOk, searchUser);
user.post("/getUsersInfo", sessionOk, getUsersInfo);
user.get("/friends/add/:id", sessionOk, ajouterAmi);
user.get("/friends/remove/:id", sessionOk, retirerAmi);
user.get("/friends/accept/:id", sessionOk, accepterAmi);
user.get("/friends/reject/:id", sessionOk, refuserAmi);
user.get("/friends/cancel/:id", sessionOk, annulerDemande);
user.post("/setuser/:id", sessionOk, multer, setUser);
user.get("/membre/:id", sessionOk, getUser);
user.get("/getAll", sessionOk, getAllUsers);
user.get("/posterinfo/:id", sessionOk, getAvatarAndPseudo);

module.exports = user;
