const express = require("express");
const userLogin = require("./controllers/user/userLogin");
const userSignUp = require("./controllers/user/userSignUp");
const sessionOk = require("./middleware/session");
/**
 * Routes générales.
 */
const router = express.Router();

const getUserRoute = require("./controllers/user/getUser");

router.get("/", (req, res) => res.status(200).send("hello"));
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/membre/:id", sessionOk, getUserRoute);

module.exports = router;
