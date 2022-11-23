const CommentModel = require("../../models/comment");
const UserModel = require("../../models/user");
const ApiError = require("../../error/ApiError");
require("dotenv").config();
const updatePostAndEmit = require("../helpers/updatePostAndEmit.js");

const postComment = async (req, res, next) => {
    const image = req.file;

    if (image) {
        const userRequete = JSON.parse(req.body.post);
        const userId = userRequete.postUserId;
        const idsToSendPost = req.app.locals[userId];
        if (idsToSendPost) {
            const commentReq = {
                ...userRequete,
                image: `${req.protocol}://${req.get("host")}/images/comments/${
                    req.file.filename
                }`,
            };
            const comment = new CommentModel({ ...commentReq });
            comment
                .save()
                .then(() =>
                    setTimeout(() => {
                        updatePostAndEmit(req, res, next, idsToSendPost);
                    }, 20)
                )
                .then(() => {
                    res.status(201).json({
                        message: "Commentaire enregistré !",
                    });
                })
                .catch((err) => {
                    return next(ApiError.internal(err.message));
                });
        } else {
            UserModel.findOne({ _id: userId })
                .then(
                    (user) => (req.app.locals[userId] = [...user.amis, userId])
                )
                .then(() => {
                    const commentReq = {
                        ...userRequete,
                        image: `${req.protocol}://${req.get(
                            "host"
                        )}/images/comments/${req.file.filename}`,
                    };
                    const comment = new CommentModel({ ...commentReq });
                    comment
                        .save()
                        .then(() =>
                            setTimeout(() => {
                                updatePostAndEmit(
                                    req,
                                    res,
                                    next,
                                    req.app.locals[userId]
                                );
                            }, 20)
                        )
                        .then(() => {
                            res.status(201).json({
                                message: "Commentaire enregistré !",
                            });
                        })
                        .catch((err) => {
                            return next(ApiError.internal(err.message));
                        });
                });
        }
    } else {
        const userRequete = req.body;
        const userId = userRequete.postUserId;
        const idsToSendPost = req.app.locals[userId];
        if (idsToSendPost) {
            const comment = new CommentModel({ ...req.body });
            comment
                .save()
                .then(() =>
                    setTimeout(() => {
                        updatePostAndEmit(req, res, next, idsToSendPost);
                    }, 20)
                )
                .then(() =>
                    res
                        .status(201)
                        .json({ message: "Commentaire enregistré !" })
                )
                .catch((err) => {
                    return next(ApiError.internal(err.message));
                });
        } else {
            UserModel.findOne({ _id: userId })
                .then(
                    (user) => (req.app.locals[userId] = [...user.amis, userId])
                )
                .then(() => {
                    const comment = new CommentModel({ ...req.body });
                    comment
                        .save()
                        .then(() =>
                            setTimeout(() => {
                                updatePostAndEmit(
                                    req,
                                    res,
                                    next,
                                    req.app.locals[userId]
                                );
                            }, 20)
                        )
                        .then(() =>
                            res
                                .status(201)
                                .json({ message: "Commentaire enregistré !" })
                        )
                        .catch((err) => {
                            return next(ApiError.internal(err.message));
                        });
                });
        }
    }
};

module.exports = postComment;
