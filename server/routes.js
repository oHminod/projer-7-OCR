const express = require("express");
const userLogin = require("./controllers/user/userLogin");
const userSignUp = require("./controllers/user/userSignUp");
const sessionOk = require("./middleware/session");
const verify = require("./controllers/verify");
const postPost = require("./controllers/post/postPost");
/**
 * Routes générales.
 */
const router = express.Router();

const getUser = require("./controllers/user/getUser");
const setUser = require("./controllers/user/setUser");
const multer = require("./middleware/multer-config");
const multerPost = require("./middleware/multer-post");

router.get("/", (req, res) => res.status(200).send("hello"));
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/setuser/:id", sessionOk, multer, setUser);
router.post("/post", sessionOk, multerPost, postPost);
router.get("/membre/:id", sessionOk, getUser);
router.get("/verify", sessionOk, verify);

module.exports = router;
