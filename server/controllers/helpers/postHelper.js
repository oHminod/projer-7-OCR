const PostModel = require("../../models/post");
const ApiError = require("../../error/ApiError");
const emitToConnectedUsers = require("../../utils/emitToConnectedUsers");
require("dotenv").config();

module.exports = (req, res, next, idsToSendPost) => {
    const image = req.file;
    if (image) {
        const userRequete = JSON.parse(req.body.post);
        const postReq = {
            ...userRequete,
            image: `${req.protocol}://${req.get("host")}/images/posts/${
                req.file.filename
            }`,
        };
        const post = new PostModel({ ...postReq });
        post.save()
            .then(() =>
                setTimeout(() => {
                    PostModel.findOne({ userId: req.session.userId })
                        .sort({ createdAt: -1 })
                        .then((data) =>
                            emitToConnectedUsers(idsToSendPost, "newPost", {
                                newPost: data,
                            })
                        )
                        .catch((err) => next(ApiError.internal(err.message)));
                }, 500)
            )
            .then(() => {
                res.status(201).json({ message: "Post enregistré !" });
            })
            .catch((err) => {
                return next(ApiError.internal(err.message));
            });
    } else {
        const post = new PostModel({ ...req.body });
        post.save()
            .then(() =>
                setTimeout(() => {
                    PostModel.findOne({ userId: req.session.userId })
                        .sort({ createdAt: -1 })
                        .then((data) =>
                            emitToConnectedUsers(idsToSendPost, "newPost", {
                                newPost: data,
                            })
                        )
                        .catch((err) => next(ApiError.internal(err.message)));
                }, 500)
            )
            .then(() => res.status(201).json({ message: "Post enregistré !" }))
            .catch((err) => {
                return next(ApiError.internal(err.message));
            });
    }
};
