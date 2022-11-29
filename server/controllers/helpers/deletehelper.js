const PostModel = require("../../models/post");
const CommentModel = require("../../models/comment");
const fs = require("fs");
const ApiError = require("../../error/ApiError");
const emitToConnectedUsers = require("../../utils/emitToConnectedUsers");

module.exports = (req, res, next, idsToSendPost) => {
    PostModel.findOne({ _id: req.params.id })
        .then((post) => {
            if (
                post.userId !== req.session.userId &&
                req.session.userRole !== "admin"
            )
                return next(ApiError.unauthorized("Accès refusé"));

            if (post.fromPostId) {
                PostModel.findOne({ _id: post.fromPostId })
                    .then((fromPost) => {
                        const userIndex = fromPost.usersShared.indexOf(
                            req.session.userId
                        );
                        userIndex !== -1 &&
                            fromPost.usersShared.splice(userIndex, 1);
                        userIndex !== -1 &&
                            fromPost.shares > 0 &&
                            (fromPost.shares -= 1);
                        return fromPost;
                    })
                    .then((fromPost) => {
                        PostModel.updateOne({ _id: fromPost._id }, fromPost)
                            .then(() =>
                                emitToConnectedUsers(
                                    idsToSendPost,
                                    "postUpdate",
                                    fromPost
                                )
                            )
                            .catch((error) => {
                                return next(ApiError.badRequest(error.message));
                            });
                    })
                    .catch(() => {
                        return post;
                    });
            }
            return post;
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
                        PostModel.updateOne({ _id: sharedPost._id }, sharedPost)
                            .then(() =>
                                emitToConnectedUsers(
                                    idsToSendPost,
                                    "PropageContentDelete",
                                    post._id
                                )
                            )
                            .catch((error) => {
                                return next(ApiError.badRequest(error.message));
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
                CommentModel.deleteMany({ postId: post._id }).catch((error) => {
                    return next(ApiError.notFound(error.message));
                });
            }
            return post;
        })
        .then((post) => {
            post &&
                setTimeout(() => {
                    if (post.image) {
                        const filename = post.image.split("/images/posts/")[1];
                        fs.unlink(`images/posts/${filename}`, () => {
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
                        });
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
                                return next(ApiError.internal(error.message));
                            });
                    }
                }, 500);
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
