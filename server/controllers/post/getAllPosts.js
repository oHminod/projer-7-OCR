const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
// const { Socket } = require("../../utils/socket");

const getAllPosts = (req, res, next) => {
    // Socket.emit("newMessage", {
    //     message: "Posts envoyés",
    // });
    PostModel.find()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            return next(ApiError.notFound(error));
        });
};
module.exports = getAllPosts;
