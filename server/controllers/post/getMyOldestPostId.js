const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");

const getMyOldestPostId = (req, res, next) => {
    PostModel.findOne({ userId: req.session.userId })
        .then((post) => res.status(200).json({ oldestPostId: post._id }))
        .catch((error) => {
            return next(ApiError.notFound(error));
        });
};
module.exports = getMyOldestPostId;
