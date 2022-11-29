const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
const fs = require("fs");
const updateHelper = require("../helpers/updateHelper");

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

                const filename =
                    (postDb.image !== "" &&
                        postDb.image.split("/images/posts/")[1]) ||
                    null;

                if (filename) {
                    fs.unlink(`images/posts/${filename}`, () => {
                        updateHelper(req, res, next, post, postId);
                    });
                } else {
                    updateHelper(req, res, next, post, postId);
                }
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
                updateHelper(req, res, next, post, postId);
            })
            .catch((error) => {
                return next(ApiError.notFound(error.message));
            });
    }
};
module.exports = updatePost;
