const UserModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../../error/ApiError");
require("dotenv").config();

/**
 * * userLogin :
 * Fonction pour connecter un utilisateur au site.
 * Une fois connecté, le browser de l'utilisateur
 * possède un token contenant son ID de manière
 * chiffrée.
 * @param {json} req The req object represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers,
 * and so on.
 * @param {json} res The res object represents the HTTP response that an
 * Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the Express
 * router which, when invoked, executes the middleware succeeding the
 * current middleware.
 */
const userLogin = (req, res, next) => {
    UserModel.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return next(ApiError.notFound("Utilisateur non trouvé !"));
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return next(
                                ApiError.forbidden("Mot de passe incorrect !")
                            );
                        } else {
                            const userInfos = {
                                _id: user._id,
                                pseudo: user.pseudo,
                                avatar: user.avatar,
                                email: user.email,
                                bio: user.bio,
                                amis: user.amis,
                                demandesAmis: user.demandesAmis,
                                demandesEnvoyees: user.demandesEnvoyees,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
                                role: user.role,
                            };
                            res.status(200).json({
                                userId: user._id,
                                user: userInfos,
                                token: jwt.sign(
                                    { userId: user._id, userRole: user.role },
                                    process.env.TOKEN,
                                    {
                                        expiresIn: "24h",
                                    }
                                ),
                            });
                        }
                    })
                    .catch((error) => {
                        return next(ApiError.internal(error.message));
                    });
            }
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};

module.exports = userLogin;
