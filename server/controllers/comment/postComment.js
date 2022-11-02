const CommentModel = require("../../models/comment");
const ApiError = require("../../error/ApiError");
const { Socket } = require("../../utils/socket");
require("dotenv").config();
const PostModel = require("../../models/post");
const updatePostCommentaires = require("../helpers/updatePostCommentaires");

const postComment = async (req, res, next) => {
    const image = req.file;

    if (image) {
        const userRequete = JSON.parse(req.body.post);
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
                    CommentModel.findOne({ userId: req.session.userId })
                        .sort({ createdAt: -1 })
                        .then((newComment) => {
                            Socket.emit("newComment", {
                                newComment: newComment,
                            });
                            return newComment;
                        })
                        .then((newComment) =>
                            PostModel.findOne({ _id: newComment.postId })
                                .then((data) => Socket.emit("postUpdate", data))
                                .then((post) => {
                                    post.commentaires = [
                                        ...post.commentaires,
                                        newComment._id,
                                    ];
                                    updatePostCommentaires(
                                        req,
                                        res,
                                        next,
                                        newComment.postId,
                                        post,
                                        "Commentaire enregistré"
                                    );
                                })
                        )
                        .catch((err) => console.log(err));
                }, 500)
            )
            .then(() => {
                res.status(201).json({ message: "Commentaire enregistré !" });
            })
            .catch((err) => {
                return next(ApiError.internal(err.message));
            });
    } else {
        const comment = new CommentModel({ ...req.body });
        comment
            .save()
            .then(() =>
                setTimeout(() => {
                    CommentModel.findOne({ userId: req.session.userId })
                        .sort({ createdAt: -1 })
                        .then((newComment) => {
                            Socket.emit("newComment", {
                                newComment: newComment,
                            });
                            return newComment;
                        })
                        .then((newComment) =>
                            PostModel.findOne({ _id: newComment.postId })
                                .then((data) => {
                                    Socket.emit("postUpdate", data);
                                    return data;
                                })
                                .then((post) => {
                                    post.commentaires = [
                                        ...post.commentaires,
                                        newComment._id,
                                    ];
                                    updatePostCommentaires(
                                        req,
                                        res,
                                        next,
                                        newComment.postId,
                                        post,
                                        "Commentaire enregistré"
                                    );
                                })
                        )
                        .catch((err) => console.log(err));
                }, 500)
            )
            .then(() =>
                res.status(201).json({ message: "Commentaire enregistré !" })
            )
            .catch((err) => {
                return next(ApiError.internal(err.message));
            });
    }
};

module.exports = postComment;
