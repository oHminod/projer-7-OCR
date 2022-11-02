const express = require("express");
const comment = express.Router();

const sessionOk = require("../middleware/session");
const multerComment = require("../middleware/multer-comment");
const postComment = require("../controllers/comment/postComment");
const getThisPostComments = require("../controllers/comment/getThisPostComments");

/**
 * Routes post.
 */

comment.post("/", sessionOk, multerComment, postComment);
comment.get("/:id", sessionOk, getThisPostComments);

module.exports = comment;
