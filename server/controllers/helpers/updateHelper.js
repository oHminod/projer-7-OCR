const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
const { Socket } = require("../../utils/socket");

module.exports = (req, res, next, post, postId) => {
    PostModel.updateOne({ _id: postId }, post)
        .then(() => {
            Socket.emit("postUpdate", post);
            return post;
        })
        .then((post) => {
            PostModel.updateMany(
                { sharedPostId: postId },
                {
                    sharedTexte: post.texte,
                    sharedImage: post.image,
                }
            )
                .then(() => {
                    PostModel.find({ sharedPostId: postId })
                        .then((posts) => {
                            posts.map((post) =>
                                Socket.emit("postUpdate", post)
                            );
                            res.status(200).json({
                                message: "Publication mise à jour",
                            });
                        })
                        .catch((error) => {
                            return next(ApiError.notFound(error.message));
                        });
                })
                .catch((error) => {
                    return next(ApiError.badRequest(error.message));
                });
        })
        .catch((error) => {
            return next(ApiError.badRequest(error.message));
        });
};
