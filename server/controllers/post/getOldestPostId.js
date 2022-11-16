const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");

const getOldestPostId = (req, res, next) => {
    PostModel.findOne()
        .then((post) => res.status(200).json({ oldestPostId: post._id }))
        .catch((error) => {
            return next(ApiError.notFound(error));
        });
};
module.exports = getOldestPostId;
