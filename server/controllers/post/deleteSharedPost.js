const PostModel = require("../../models/post");
const fs = require("fs");
const ApiError = require("../../error/ApiError");
const { Socket } = require("../../utils/socket");

/**
 * * deleteSharedPost :
 * Fonction pour supprimer (delete) un post partagé de la BDD,
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
const deleteSharedPost = (req, res, next) => {
    PostModel.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.session.userId) {
                return next(ApiError.unauthorized("Accès refusé"));
            } else {
                post.usersShared.map((ID) =>
                    PostModel.findOne({
                        userId: ID,
                        sharedPostId: req.params.id,
                    })
                        .then((sharedPost) => {
                            sharedPost.sharedImage = "";
                            sharedPost.sharedTexte =
                                "La publication a été supprimée";
                            PostModel.updateOne(
                                { _id: sharedPost._id },
                                sharedPost
                            )
                                .then(() =>
                                    Socket.emit("likeAndLovesResponse", post)
                                )
                                .catch((error) => {
                                    return next(
                                        ApiError.badRequest(error.message)
                                    );
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
            PostModel.findOne({ _id: post.sharedPostId })
                .then((originalPost) => {
                    const userIndex = originalPost.usersShared.indexOf(
                        req.session.userId
                    );
                    userIndex !== -1 &&
                        originalPost.usersShared.splice(userIndex, 1);
                    originalPost.shares > 0 && (originalPost.shares -= 1);
                    return originalPost;
                })
                .then((originalPost) => {
                    PostModel.updateOne({ _id: originalPost._id }, originalPost)
                        .then(() =>
                            Socket.emit("likeAndLovesResponse", originalPost)
                        )
                        .catch((error) => {
                            return next(ApiError.badRequest(error.message));
                        });
                })
                .catch((error) => {
                    return next(ApiError.notFound(error.message));
                });
        })
        .then(() => {
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
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = deleteSharedPost;
