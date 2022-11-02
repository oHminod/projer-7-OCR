const mongoose = require("mongoose");

const commentModel = mongoose.Schema(
    {
        userId: { type: String, required: true },
        postId: { type: String, required: true },
        commentId: { type: String, required: true },
        threadId: { type: String, required: true },
        text: { type: String, required: true },
        image: {
            type: String,
        },
        likes: { type: Number, default: 0 },
        loves: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        usersLiked: { type: Array, default: [] },
        usersLoved: { type: Array, default: [] },
        usersShared: { type: Array, default: [] },
        comments: { type: Array, default: [] },
    },
    { timestamps: true }
);

/**
 * * commentModel :
 * Modèle de données d'un commentaire.
 */
module.exports = mongoose.model("CommentModel", commentModel);
