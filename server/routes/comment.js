const express = require("express");
const comment = express.Router();

const { xss } = require("express-xss-sanitizer");
const sessionOk = require("../middleware/session");
const multerComment = require("../middleware/multer-comment");
const postComment = require("../controllers/comment/postComment");
const getThisPostComments = require("../controllers/comment/getThisPostComments");

/**
 * Routes post.
 */

comment.post("/", sessionOk, xss(), multerComment, postComment);
comment.get("/:id", sessionOk, getThisPostComments);

module.exports = comment;
