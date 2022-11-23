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
    const userId = req.session.userId;
    const userToEmit = { ...user, userId: userId };
    const idsToSendPost = req.app.locals[userId];

    if (idsToSendPost) {
        UserModel.updateOne({ _id: req.session.userId }, user)
            .then(() => {
                idsToSendPost.map(
                    (room) =>
                        Socket.has(room) &&
                        Socket.to(room, "newUserInfo", userToEmit)
                );
                res.status(200).json({ message: message });
            })
            .catch((error) => {
                return next(ApiError.badRequest(error.message));
            });
    } else {
        UserModel.findOne({ _id: userId })
            .then((user) => (req.app.locals[userId] = [...user.amis, userId]))
            .then(() => {
                UserModel.updateOne({ _id: req.session.userId }, user)
                    .then(() => {
                        req.app.locals[userId].map(
                            (room) =>
                                Socket.has(room) &&
                                Socket.to(room, "newUserInfo", userToEmit)
                        );
                        res.status(200).json({ message: message });
                    })
                    .catch((error) => {
                        return next(ApiError.badRequest(error.message));
                    });
            });
    }
};
