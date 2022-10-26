const express = require("express");
const post = express.Router();

const sessionOk = require("../middleware/session");
const postPost = require("../controllers/post/postPost");
const getAllPosts = require("../controllers/post/getAllPosts");
const getAllMyPosts = require("../controllers/post/getAllMyPosts");
/**
 * Routes post.
 */

const multerPost = require("../middleware/multer-post");

post.get("/", sessionOk, getAllPosts);
post.get("/:id", sessionOk, getAllMyPosts);
post.post("/post", sessionOk, multerPost, postPost);

module.exports = post;
