const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");

const getAllMyPosts = (req, res, next) => {
    req.session.userId !== req.params.id &&
        next(ApiError.forbidden("Accès interdit !"));
    PostModel.find({ userId: req.params.id })
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            return next(ApiError.notFound(error));
        });
};
module.exports = getAllMyPosts;
