const express = require("express");
const post = express.Router();

const sessionOk = require("../middleware/session");
const postPost = require("../controllers/post/postPost");
const getAllPosts = require("../controllers/post/getAllPosts");
const getAllMyPosts = require("../controllers/post/getAllMyPosts");
const likerPost = require("../controllers/post/likerPost");
const loverPost = require("../controllers/post/loverPost");
const partagerPost = require("../controllers/post/partagerPost");
/**
 * Routes post.
 */

const multerPost = require("../middleware/multer-post");

post.get("/", sessionOk, getAllPosts);
post.get("/:id", sessionOk, getAllMyPosts);
post.post("/post", sessionOk, multerPost, postPost);
post.post("/:id/like", sessionOk, likerPost);
post.post("/:id/love", sessionOk, loverPost);
post.post("/:id/share", sessionOk, partagerPost);

module.exports = post;
