const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");

const getAllMyPostsPaginated = (req, res, next) => {
    if (req.params.lastItemId) {
        PostModel.find({
            $and: [
                { userId: req.session.userId },
                {
                    _id: { $lt: req.params.lastItemId },
                },
            ],
        })
            .sort({ _id: -1 })
            .limit(req.params.offset)
            .then((posts) => {
                res.status(200).json(posts);
            })
            .catch((error) => {
                return next(ApiError.notFound(error));
            });
    } else {
        PostModel.find({ userId: req.session.userId })
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
module.exports = getAllMyPostsPaginated;
