const mongoose = require("mongoose");
const uniqueInDB = require("mongoose-unique-validator");

const userModel = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
        type: String,
        default: "http://localhost:36600/images/avatars/default-avatar.jpg",
    },
    pseudo: { type: String, default: "", unique: true },
});
userModel.plugin(uniqueInDB);

/**
 * * userModel :
 * Modèle de données d'un utilisateur.
 */
module.exports = mongoose.model("UserModel", userModel);
