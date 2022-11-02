const CommentModel = require("../../models/comment");
const ApiError = require("../../error/ApiError");
require("dotenv").config();
const updatePostAndEmit = require("../helpers/updatePostAndEmit.js");

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
                    updatePostAndEmit(req, res, next);
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
                    updatePostAndEmit(req, res, next);
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
