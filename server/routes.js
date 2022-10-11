const express = require("express");
const userLogin = require("./controllers/user/userLogin");
const userSignUp = require("./controllers/user/userSignUp");
/**
 * Routes générales.
 */
const router = express.Router();

router.get("/", (req, res) => res.status(200).send("hello"));
router.post("/signup", userSignUp);
router.post("/login", userLogin);

module.exports = router;
