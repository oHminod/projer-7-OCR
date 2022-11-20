const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
// const { Socket } = require("../../utils/socket");

const getAllPostsPaginated = (req, res, next) => {
    // Socket.to(req.session.userId, "event", "data");
    // console.log(Socket.has("63581cdf7a02cb943992e6a0")); //true si pipo@pipo.com est connecté
    PostModel.find(
        req.params.lastItemId && {
            _id: { $lt: req.params.lastItemId },
        }
    )
        .sort({ _id: -1 })
        .limit(req.params.offset)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            return next(ApiError.notFound(error));
        });
};
module.exports = getAllPostsPaginated;
