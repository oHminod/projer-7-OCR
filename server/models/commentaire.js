const mongoose = require("mongoose");

const commentaireModel = mongoose.Schema(
    {
        userId: { type: String, required: true },
        postId: { type: String, required: true },
        threadId: { type: String, required: true },
        image: {
            type: String,
        },
        likes: { type: Number, default: 0 },
        loves: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        usersLiked: { type: Array, default: [] },
        usersLoved: { type: Array, default: [] },
        usersShared: { type: Array, default: [] },
        commentaires: { type: Array, default: [] },
    },
    { timestamps: true }
);

/**
 * * commentaireModel :
 * Modèle de données d'un commentaire.
 */
module.exports = mongoose.model("CommentaireModel", commentaireModel);
