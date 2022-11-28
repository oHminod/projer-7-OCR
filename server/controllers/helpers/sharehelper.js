const PostModel = require("../../models/post");
const CommentModel = require("../../models/comment");
const fs = require("fs");
const ApiError = require("../../error/ApiError");
const emitToConnectedUsers = require("../../utils/emitToConnectedUsers");

module.exports = (req, res, next, idsToSendPost) => {
    const shareThisPost = req.body.post;
    const action = +req.body.action; // 0 ou 1

    if (action === 1) {
        shareThisPost.usersShared.push(req.session.userId);
        shareThisPost.shares = shareThisPost.usersShared.length;
        PostModel.updateOne({ _id: shareThisPost._id }, shareThisPost)
            .then(() =>
                emitToConnectedUsers(idsToSendPost, "postUpdate", shareThisPost)
            )
            .then(() => {
                let newPost = {};
                if (shareThisPost.sharedPostId !== "") {
                    newPost = {
                        userId: req.session.userId,
                        fromPostId: shareThisPost._id,
                        sharedPostId: shareThisPost.sharedPostId,
                        sharedUserId: shareThisPost.sharedUserId,
                        sharedTexte: shareThisPost.sharedTexte,
                        sharedImage: shareThisPost.sharedImage,
                        originalPostCreatedAt:
                            shareThisPost.originalPostCreatedAt,
                    };
                } else {
                    newPost = {
                        userId: req.session.userId,
                        fromPostId: shareThisPost._id,
                        sharedPostId: shareThisPost._id,
                        sharedUserId: shareThisPost.userId,
                        sharedTexte: shareThisPost.texte,
                        sharedImage: shareThisPost.image,
                        originalPostCreatedAt: shareThisPost.createdAt,
                    };
                }
                const post = new PostModel({ ...newPost });
                post.save()
                    .then(() =>
                        setTimeout(() => {
                            PostModel.findOne({ userId: req.session.userId })
                                .sort({ createdAt: -1 })
                                .then((data) =>
                                    emitToConnectedUsers(
                                        req.app.locals.settings[
                                            req.session.userId
                                        ],
                                        "newPost",
                                        {
                                            newPost: data,
                                        }
                                    )
                                )
                                .catch((err) =>
                                    next(ApiError.internal(err.message))
                                );
                        }, 500)
                    )
                    .then(() =>
                        res.status(201).json({ message: "Post enregistré !" })
                    )
                    .catch((err) => {
                        return next(ApiError.internal(err.message));
                    });
            })
            .catch((err) => next(ApiError.badRequest(err.message)));
    } else if (action === 0) {
        shareThisPost.usersShared = shareThisPost.usersShared.filter(
            (id) => id !== req.session.userId
        );
        shareThisPost.shares = shareThisPost.usersShared.length;
        PostModel.updateOne({ _id: shareThisPost._id }, shareThisPost)
            .then(() =>
                emitToConnectedUsers(idsToSendPost, "postUpdate", shareThisPost)
            )
            .then(() => {
                PostModel.findOne({
                    $and: [
                        { userId: req.session.userId },
                        {
                            fromPostId: shareThisPost._id,
                        },
                    ],
                })
                    .then((post) => {
                        PostModel.find({
                            sharedPostId: req.params.id,
                        })
                            .then((sharedPosts) => {
                                sharedPosts.map((sharedPost) => {
                                    sharedPost.sharedImage = "";
                                    sharedPost.sharedTexte =
                                        "La publication a été supprimée";
                                    PostModel.updateOne(
                                        { _id: sharedPost._id },
                                        sharedPost
                                    )
                                        .then(() =>
                                            emitToConnectedUsers(
                                                idsToSendPost,
                                                "PropageContentDelete",
                                                post._id
                                            )
                                        )
                                        .catch((error) => {
                                            return next(
                                                ApiError.badRequest(
                                                    error.message
                                                )
                                            );
                                        });
                                });
                            })
                            .catch(() => {
                                return post; //next(ApiError.notFound(error.message));
                            });
                        return post;
                    })
                    .then((post) => {
                        //S'il y a des commentaires
                        if (post && post.commentaires.length > 0) {
                            CommentModel.deleteMany({ postId: post._id }).catch(
                                (error) => {
                                    return next(
                                        ApiError.notFound(error.message)
                                    );
                                }
                            );
                        }
                        return post;
                    })
                    .then((post) => {
                        post &&
                            setTimeout(() => {
                                if (post.image) {
                                    const filename =
                                        post.image.split("/images/posts/")[1];
                                    fs.unlink(
                                        `images/posts/${filename}`,
                                        () => {
                                            PostModel.deleteOne({
                                                _id: post._id,
                                            })
                                                .then(() => {
                                                    emitToConnectedUsers(
                                                        idsToSendPost,
                                                        "postDeleted",
                                                        post._id
                                                    );
                                                    return res
                                                        .status(200)
                                                        .json({
                                                            message:
                                                                "Post supprimée !",
                                                        });
                                                })
                                                .catch((error) => {
                                                    return next(
                                                        ApiError.internal(
                                                            error.message
                                                        )
                                                    );
                                                });
                                        }
                                    );
                                } else {
                                    PostModel.deleteOne({ _id: post._id })
                                        .then(() => {
                                            emitToConnectedUsers(
                                                idsToSendPost,
                                                "postDeleted",
                                                post._id
                                            );
                                            return res.status(200).json({
                                                message: "Post supprimée !",
                                            });
                                        })
                                        .catch((error) => {
                                            return next(
                                                ApiError.internal(error.message)
                                            );
                                        });
                                }
                            }, 500);
                    })
                    .catch((error) => {
                        return next(ApiError.notFound(error.message));
                    });
            })
            .catch((err) => next(ApiError.badRequest(err.message)));
    }
};
