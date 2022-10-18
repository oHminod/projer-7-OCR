const express = require("express");
const userLogin = require("./controllers/user/userLogin");
const userSignUp = require("./controllers/user/userSignUp");
const sessionOk = require("./middleware/session");
const verify = require("./controllers/verify");
/**
 * Routes générales.
 */
const router = express.Router();

const getUserRoute = require("./controllers/user/getUser");

router.get("/", (req, res) => res.status(200).send("hello"));
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/membre/:id", sessionOk, getUserRoute);
router.get("/verify", sessionOk, verify);

module.exports = router;
