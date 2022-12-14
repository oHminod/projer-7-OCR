const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
const CommentModel = require("../../models/comment");
const emitToConnectedUsers = require("../../utils/emitToConnectedUsers");

/**
 * * updatePostAndEmit.js :
 * @param {json} req The req object represents the HTTP request
 * and has properties for the request query string, parameters,
 * body, HTTP headers, and so on.
 * @param {json} res The res object represents the HTTP response
 * that an Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the
 * Express router which, when invoked, executes the middleware
 * succeeding the current middleware.
 */
module.exports = (req, res, next, idsToSendPost) => {
    CommentModel.findOne({ userId: req.session.userId })
        .sort({ createdAt: -1 })
        .then((newComment) => {
            emitToConnectedUsers(idsToSendPost, "newComment", {
                newComment: newComment,
            });
            return newComment;
        })
        .then((newComment) =>
            PostModel.findOne({
                _id: newComment.postId,
            }).then((post) => {
                post.commentaires = [...post.commentaires, newComment._id];
                emitToConnectedUsers(idsToSendPost, "postUpdate", post);
                PostModel.updateOne({ _id: newComment.postId }, post).catch(
                    (error) => {
                        return next(ApiError.badRequest(error.message));
                    }
                );
            })
        )
        .catch((err) => next(ApiError.internal(err.message)));
};
