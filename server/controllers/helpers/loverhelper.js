const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
const emitToConnectedUsers = require("../../utils/emitToConnectedUsers");

module.exports = (req, res, next, idsToSendPost) => {
    PostModel.findOne({ _id: req.params.id })
        .then((post) => {
            let userLove = post.usersLoved.indexOf(req.session.userId);

            if (req.body.love == "1" && userLove == -1) {
                post.usersLoved.push(req.session.userId);
                post.loves = post.usersLoved.length;
                PostModel.updateOne({ _id: req.params.id }, post)
                    .then(() =>
                        setTimeout(() => {
                            PostModel.findOne({ _id: req.params.id })
                                .then((data) =>
                                    emitToConnectedUsers(
                                        idsToSendPost,
                                        "postUpdate",
                                        data
                                    )
                                )
                                .catch((err) =>
                                    next(ApiError.notFound(err.message))
                                );
                        }, 100)
                    )
                    .then(() => {
                        res.status(200).json({ message: "Post lové !" });
                    })
                    .catch((error) => {
                        return next(ApiError.badRequest(error.message));
                    });
            } else if (req.body.love == "0" && userLove != -1) {
                post.usersLoved.splice(userLove, 1);
                post.loves = post.usersLoved.length;
                PostModel.updateOne({ _id: req.params.id }, post)
                    .then(() =>
                        setTimeout(() => {
                            PostModel.findOne({ _id: req.params.id })
                                .then((data) =>
                                    emitToConnectedUsers(
                                        idsToSendPost,
                                        "postUpdate",
                                        data
                                    )
                                )
                                .catch((err) =>
                                    next(ApiError.notFound(err.message))
                                );
                        }, 100)
                    )
                    .then(() => {
                        res.status(200).json({ message: "Post délové !" });
                    })
                    .catch((error) => {
                        return next(ApiError.badRequest(error.message));
                    });
            } else {
                return next(ApiError.badRequest("Bad request"));
            }
            return post;
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
