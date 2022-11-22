const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
const UserModel = require("../../models/user");

const getAllPostsPaginated = (req, res, next) => {
    const userId = req.session.userId;
    const idsToQuery = req.app.locals[userId];

    if (!req.params.lastItemId) {
        UserModel.findOne({ _id: userId })
            .then((user) => (req.app.locals[userId] = [...user.amis, userId]))
            .then(() => {
                PostModel.find({ userId: { $in: req.app.locals[userId] } })
                    .sort({ _id: -1 })
                    .limit(req.params.offset)
                    .then((posts) => {
                        res.status(200).json(posts);
                    })
                    .catch((error) => {
                        return next(ApiError.notFound(error));
                    });
            })
            .catch((err) => next(ApiError.notFound(err)));
    } else {
        PostModel.find({
            $and: [
                { userId: { $in: idsToQuery } },
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
    }
};
module.exports = getAllPostsPaginated;
