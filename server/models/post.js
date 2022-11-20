const mongoose = require("mongoose");

const postModel = mongoose.Schema(
    {
        userId: { type: String, required: true },
        texte: { type: String, default: "" },
        image: { type: String, default: "" },
        likes: { type: Number, default: 0 },
        loves: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        // usersLiked: { type: Array, default: [] },
        usersLoved: { type: Array, default: [] },
        usersShared: { type: Array, default: [] },
        commentaires: { type: Array, default: [] },
        fromPostId: { type: String, default: "" },
        sharedPostId: { type: String, default: "" },
        sharedUserId: { type: String, default: "" },
        sharedTexte: { type: String, default: "" },
        sharedImage: { type: String, default: "" },
        originalPostCreatedAt: { type: String },
    },
    { timestamps: true }
);

/**
 * * postModel :
 * Modèle de données d'un post.
 */
module.exports = mongoose.model("PostModel", postModel);
