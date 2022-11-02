const ApiError = require("../../error/ApiError");
const CommentModel = require("../../models/comment");

const getThisPostComments = (req, res, next) => {
    CommentModel.find({ postId: req.params.id })
        .then((comments) => {
            res.status(200).json(comments);
        })
        .catch((error) => {
            return next(ApiError.notFound(error));
        });
};
module.exports = getThisPostComments;
