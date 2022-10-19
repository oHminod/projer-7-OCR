const UserModel = require("../../models/user");
const ApiError = require("../../error/ApiError");
require("dotenv").config();

const setUser = async (req, res, next) => {
    console.log(req);
    console.log("salut");
    res.status(201).json({ message: "Utilisateur enregistré !" });
    // const user = new UserModel({
    //     ...req.body,
    // });
    // user.save()
    //     .then(() =>
    //         res.status(201).json({ message: "Utilisateur enregistré !" })
    //     )
    //     .catch((error) => {
    //         return next(ApiError.badRequest(error.message));
    //     });
};

module.exports = setUser;
