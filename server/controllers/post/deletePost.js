const PostModel = require("../../models/post");
const CommentModel = require("../../models/comment");
const fs = require("fs");
const ApiError = require("../../error/ApiError");
const { Socket } = require("../../utils/socket");

function deleteSharedPostsData(req, res, next, post) {
    //Si le post a été partagé le tableau usersShared contient les id des utilisateurs ayant partagé
    if (post.usersShared.length > 0) {
        post.usersShared.map((ID) =>
            PostModel.find({
                userId: ID,
                sharedPostId: req.params.id,
            })
                .then((sharedPosts) => {
                    sharedPosts.map((sharedPost) => {
                        sharedPost.sharedImage = "";
                        sharedPost.sharedTexte =
                            "La publication a été supprimée";
                        PostModel.updateOne({ _id: sharedPost._id }, sharedPost)
                            .then(() => deleteSharedPostsData(sharedPost))
                            .then(() =>
                                Socket.emit("likeAndLovesResponse", sharedPost)
                            )
                            .catch((error) => {
                                return next(ApiError.badRequest(error.message));
                            });
                    });
                })
                .catch((error) => {
                    return next(ApiError.notFound(error.message));
                })
        );
    }
    return post;
}

/**
 * * deletePost :
 * Fonction pour supprimer (delete) un post de la BDD,
 * supprime également son image dans le file system.
 * @param {json} req The req object represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers,
 * and so on.
 * @param {json} res The res object represents the HTTP response that an
 * Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the Express
 * router which, when invoked, executes the middleware succeeding the
 * current middleware.
 */
const deletePost = (req, res, next) => {
    PostModel.findOne({ _id: req.params.id })
        .then((post) => {
            post.userId != req.session.userId &&
                next(ApiError.unauthorized("Accès refusé"));
            //Si c'est un post partagé alors sharedPostId contient l'id du post d'origine
            if (post.sharedPostId) {
                PostModel.findOne({ _id: req.params.id })
                    .then((originalPost) => {
                        const userIndex = originalPost.usersShared.indexOf(
                            req.session.userId
                        );
                        userIndex !== -1 &&
                            originalPost.usersShared.splice(userIndex, 1);
                        userIndex !== -1 &&
                            originalPost.shares > 0 &&
                            (originalPost.shares -= 1);
                        return originalPost;
                    })
                    .then((originalPost) => {
                        PostModel.updateOne(
                            { _id: originalPost._id },
                            originalPost
                        )
                            .then(() =>
                                Socket.emit(
                                    "likeAndLovesResponse",
                                    originalPost
                                )
                            )
                            .catch((error) => {
                                return next(ApiError.badRequest(error.message));
                            });
                    })
                    .catch((error) => {
                        return next(ApiError.notFound(error.message));
                    });
            }
            return post;
        })
        .then((post) => {
            if (post.usersShared.length > 0) {
                post.usersShared.map((ID) =>
                    PostModel.find({
                        userId: ID,
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
                                        Socket.emit(
                                            "likeAndLovesResponse",
                                            sharedPost
                                        )
                                    )
                                    .catch((error) => {
                                        return next(
                                            ApiError.badRequest(error.message)
                                        );
                                    });
                            });
                        })
                        .catch((error) => {
                            return next(ApiError.notFound(error.message));
                        })
                );
            }
            return post;
        })
        .then((post) => {
            //S'il y a des commentaires
            if (post.commentaires.length > 0) {
                CommentModel.deleteMany({ postId: post._id }).catch((error) => {
                    return next(ApiError.notFound(error.message));
                });
            }
            return post;
        })
        .then((post) => {
            setTimeout(() => {
                if (post.image) {
                    const filename = post.image.split("/images/posts/")[1];
                    fs.unlink(`images/posts/${filename}`, () => {
                        PostModel.deleteOne({ _id: req.params.id })
                            .then(() => {
                                Socket.emit("postDeleted", req.params.id);
                                return res.status(200).json({
                                    message: "Post supprimée !",
                                });
                            })
                            .catch((error) => {
                                return next(ApiError.internal(error.message));
                            });
                    });
                } else {
                    PostModel.deleteOne({ _id: req.params.id })
                        .then(() => {
                            Socket.emit("postDeleted", req.params.id);
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
module.exports = deletePost;
