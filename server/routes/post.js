const express = require("express");
const post = express.Router();

const sessionOk = require("../middleware/session");
const postPost = require("../controllers/post/postPost");
const loverPost = require("../controllers/post/loverPost");
const deletePost = require("../controllers/post/deletePost");
const getOldestPostId = require("../controllers/post/getOldestPostId");
const getAllPostsPaginated = require("../controllers/post/getAllPostsPaginated");
const getMyOldestPostId = require("../controllers/post/getMyOldestPostId");
const getAllMyPostsPaginated = require("../controllers/post/getAllMyPostsPaginated");
const sharePost = require("../controllers/post/sharePost");
// const deleteSharedPost = require("../controllers/post/deleteSharedPost");
/**
 * Routes post.
 */

const multerPost = require("../middleware/multer-post");

post.get("/oldest", sessionOk, getOldestPostId);
post.get("/myOldest", sessionOk, getMyOldestPostId);
post.get("/my/:offset/:lastItemId?", sessionOk, getAllMyPostsPaginated);
post.get("/:offset/:lastItemId?", sessionOk, getAllPostsPaginated);
post.post("/post", sessionOk, multerPost, postPost);
post.post("/share", sessionOk, sharePost);
post.post("/:id/love", sessionOk, loverPost);
post.delete("/delete/:id", sessionOk, deletePost);

module.exports = post;
