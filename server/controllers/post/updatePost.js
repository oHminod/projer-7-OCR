const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
const { Socket } = require("../../utils/socket");

const updatePost = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.session.userId;
    const userRole = req.session.userRole;
    const image = req.file;
    let post = new PostModel();

    if (image) {
        const postRequete = JSON.parse(req.body.post);
        PostModel.findOne({ _id: postId })
            .then((postDb) => {
                if (postDb.userId !== userId && userRole !== "admin") {
                    return next(ApiError.forbidden("Action interdite"));
                }

                post = {
                    ...postRequete,
                    image: `${req.protocol}://${req.get("host")}/images/posts/${
                        req.file.filename
                    }`,
                };

                return post;
            })
            .then((post) => {
                PostModel.updateOne({ _id: postId })
                    .then(() => {
                        Socket.emit("postUpdate", post);
                        res.status(200).json({
                            message: "Publication mise à jour",
                        });
                    })
                    .catch((error) => {
                        return next(ApiError.badRequest(error.message));
                    });
            })
            .catch((error) => {
                return next(ApiError.notFound(error.message));
            });
    } else {
        PostModel.findOne({ _id: postId })
            .then((postDb) => {
                if (postDb.userId !== userId && userRole !== "admin") {
                    return next(ApiError.forbidden("Action interdite"));
                }

                post = {
                    ...req.body,
                };

                return post;
            })
            .then((post) => {
                PostModel.updateOne({ _id: postId })
                    .then(() => {
                        Socket.emit("postUpdate", post);
                        res.status(200).json({
                            message: "Publication mise à jour",
                        });
                    })
                    .catch((error) => {
                        return next(ApiError.badRequest(error.message));
                    });
            })
            .catch((error) => {
                return next(ApiError.notFound(error.message));
            });
    }
};
module.exports = updatePost;
