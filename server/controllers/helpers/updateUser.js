const ApiError = require("../../error/ApiError");
const UserModel = require("../../models/user");
const { Socket } = require("../../utils/socket");

/**
 * * updateUser :
 * Fonction pour mettre à jour (update) un utilisateur.
 * @param {json} req The req object represents the HTTP request
 * and has properties for the request query string, parameters,
 * body, HTTP headers, and so on.
 * @param {json} res The res object represents the HTTP response
 * that an Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the
 * Express router which, when invoked, executes the middleware
 * succeeding the current middleware.
 * @param {json} user Les données fournies par cet objet
 * écraseront celles de la BDD.
 * @param {string} message Message de réussite.
 */
module.exports = (req, res, next, user, message) => {
    const userToEmit = { ...user, userId: req.session.userId };

    UserModel.updateOne({ _id: req.session.userId }, user)
        .then(() => {
            Socket.emit("newUserInfo", userToEmit);
            res.status(200).json({ message: message });
        })
        .catch((error) => {
            return next(ApiError.badRequest(error.message));
        });
};
