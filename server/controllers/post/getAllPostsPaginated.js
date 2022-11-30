const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");

const getAllPostsPaginated = (req, res, next) => {
    if (!req.params.lastItemId) {
        PostModel.find()
            .sort({ _id: -1 })
            .limit(req.params.offset)
            .then((posts) => {
                res.status(200).json(posts);
            })
            .catch((error) => {
                return next(ApiError.notFound(error));
            });
    } else {
        PostModel.find(
            req.params.lastItemId && { _id: { $lt: req.params.lastItemId } }
        )
            .sort({ _id: -1 })
            .limit(req.params.offset)
            .then((posts) => {
                res.status(200).json(posts);
            })
            .catch((error) => {
                return next(ApiError.notFound(error));
            });
    }
};
module.exports = getAllPostsPaginated;
