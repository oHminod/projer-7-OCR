const CommentModel = require("../../models/comment");
const ApiError = require("../../error/ApiError");
const { Socket } = require("../../utils/socket");

const updateComment = (req, res, next) => {
    const commentId = req.params.id;
    const userId = req.session.userId;
    const userRole = req.session.userRole;
    const updatedComment = req.body;

    CommentModel.findOne({ _id: commentId })
        .then((commentDB) => {
            if (commentDB.userId !== userId && userRole !== "admin") {
                return next(ApiError.forbidden("Action interdite"));
            }
        })
        .then(() => {
            CommentModel.updateOne({ _id: commentId }, updatedComment)
                .then(() => {
                    Socket.emit("commentUpdate", updatedComment);
                })
                .catch((error) => {
                    return next(ApiError.badRequest(error.message));
                });
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = updateComment;
