const UserModel = require("../../models/user");
const ApiError = require("../../error/ApiError");
const fs = require("fs");
const updateUser = require("../helpers/updateUser");
require("dotenv").config();

const setUser = async (req, res, next) => {
    const image = req.file;
    let user = new UserModel();
    if (image) {
        const userRequete = JSON.parse(req.body.user);
        UserModel.findOne({ _id: req.session.userId })
            .then((userDb) => {
                const oldFilename = userDb.avatar.split("/avatars/")[1];

                if (oldFilename != "default-avatar.jpg") {
                    fs.unlink(`images/avatars/${oldFilename}`, () => {
                        user = {
                            ...userRequete,
                            avatar: `${req.protocol}://${req.get(
                                "host"
                            )}/images/avatars/${req.file.filename}`,
                        };
                        updateUser(
                            req,
                            res,
                            next,
                            user,
                            "Utilisateur modifiée !"
                        );
                    });
                } else {
                    user = {
                        ...userRequete,
                        avatar: `${req.protocol}://${req.get(
                            "host"
                        )}/images/avatars/${req.file.filename}`,
                    };
                    updateUser(req, res, next, user, "Utilisateur modifiée !");
                }
            })
            .catch((error) => {
                return next(ApiError.notFound(error.message));
            });
    } else {
        UserModel.findOne({ _id: req.session.userId })
            .then(() => {
                user = {
                    ...req.body,
                };
                updateUser(req, res, next, user, "Utilisateur modifiée !");
            })
            .catch((error) => {
                return next(ApiError.notFound(error.message));
            });
    }
};

module.exports = setUser;
