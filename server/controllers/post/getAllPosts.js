const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");

const getAllPosts = (req, res, next) => {
    PostModel.find()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            return next(ApiError.notFound(error));
        });
};
module.exports = getAllPosts;
