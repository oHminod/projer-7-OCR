const express = require("express");
const post = express.Router();

const sessionOk = require("../middleware/session");
const postPost = require("../controllers/post/postPost");
const getAllPosts = require("../controllers/post/getAllPosts");
const getAllMyPosts = require("../controllers/post/getAllMyPosts");
const likerPost = require("../controllers/post/likerPost");
const loverPost = require("../controllers/post/loverPost");
const partagerPost = require("../controllers/post/partagerPost");
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

post.get("/", sessionOk, getAllPosts);
post.get("/oldest", sessionOk, getOldestPostId);
post.get("/myOldest", sessionOk, getMyOldestPostId);
post.get("/my/:offset/:lastItemId?", sessionOk, getAllMyPostsPaginated);
post.get("/:offset/:lastItemId?", sessionOk, getAllPostsPaginated);
post.get("/:id", sessionOk, getAllMyPosts);
post.post("/post", sessionOk, multerPost, postPost);
post.post("/share", sessionOk, sharePost);
post.post("/:id/like", sessionOk, likerPost);
post.post("/:id/love", sessionOk, loverPost);
post.post("/:id/share", sessionOk, partagerPost);
post.delete("/delete/:id", sessionOk, deletePost);
// post.delete("/shared/:id", sessionOk, deleteSharedPost);

module.exports = post;
