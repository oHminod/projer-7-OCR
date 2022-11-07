const mongoose = require("mongoose");

const postModel = mongoose.Schema(
    {
        userId: { type: String, required: true },
        texte: { type: String },
        image: { type: String },
        likes: { type: Number, default: 0 },
        loves: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        usersLiked: { type: Array, default: [] },
        usersLoved: { type: Array, default: [] },
        usersShared: { type: Array, default: [] },
        commentaires: { type: Array, default: [] },
        sharedPostId: { type: String },
        sharedUserId: { type: String },
        sharedTexte: { type: String },
        sharedImage: { type: String },
        originalPostCreatedAt: { type: String },
    },
    { timestamps: true }
);

/**
 * * postModel :
 * Modèle de données d'un post.
 */
module.exports = mongoose.model("PostModel", postModel);
