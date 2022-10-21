const mongoose = require("mongoose");
const uniqueInDB = require("mongoose-unique-validator");

const userModel = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        pseudo: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: {
            type: String,
            default: "http://localhost:36600/images/avatars/default-avatar.jpg",
        },
        bio: { type: String, text: true, default: "" },
        amis: { type: Array, default: [] },
        demandesAmis: { type: Array, default: [] },
        posts: { type: Array, default: [] },
        sharedPosts: [
            {
                postId: { type: String, required: true },
                shareDate: { type: Date, default: Date.now },
            },
        ],
        commentaires: { type: Array, default: [] },
    },
    { timestamps: true }
);
userModel.plugin(uniqueInDB);

/**
 * * userModel :
 * Modèle de données d'un utilisateur.
 */
module.exports = mongoose.model("UserModel", userModel);
