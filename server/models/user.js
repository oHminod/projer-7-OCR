const mongoose = require("mongoose");
const uniqueInDB = require("mongoose-unique-validator");

// const sharedPosts = mongoose.Schema(
//     {
//         postId: { type: String, required: true },
//     },
//     { timestamps: true }
// );

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
        demandesEnvoyees: { type: Array, default: [] },
        // posts: { type: Array, default: [] },
        // sharedPosts: [sharedPosts],
        // commentaires: { type: Array, default: [] },
        role: { type: String, default: "visitor" },
    },
    { timestamps: true }
);
userModel.plugin(uniqueInDB);

/**
 * * userModel :
 * Modèle de données d'un utilisateur.
 */
module.exports = mongoose.model("UserModel", userModel);
