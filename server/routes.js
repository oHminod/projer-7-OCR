const express = require("express");
const userLogin = require("./controllers/user/userLogin");
const userSignUp = require("./controllers/user/userSignUp");
const sessionOk = require("./middleware/session");
const verify = require("./controllers/verify");
/**
 * Routes générales.
 */
const router = express.Router();

const getUser = require("./controllers/user/getUser");
const setUser = require("./controllers/user/setUser");
const multer = require("./middleware/multer-config");

router.get("/", (req, res) => res.status(200).send("hello"));
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/setuser/:id", sessionOk, multer, setUser);
router.get("/membre/:id", sessionOk, getUser);
router.get("/verify", sessionOk, verify);

module.exports = router;
