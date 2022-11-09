const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
const { Socket } = require("../../utils/socket");

/**
 * * updatePost :
 * Fonction pour mettre à jour (update) une sauce.
 * @param {json} req The req object represents the HTTP request
 * and has properties for the request query string, parameters,
 * body, HTTP headers, and so on.
 * @param {json} res The res object represents the HTTP response
 * that an Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the
 * Express router which, when invoked, executes the middleware
 * succeeding the current middleware.
 * @param {json} id id du post à modifier
 * @param {json} post Les données fournies par cet objet
 * écraseront celles de la BDD.
 * @param {string} message Message de réussite.
 */
module.exports = (req, res, next, id, post, message) => {
    PostModel.updateOne({ _id: id }, post)
        .then(() => Socket.emit("likeAndLovesResponse", post))
        .then(() => {
            res.status(200).json({ message: message });
        })
        .catch((error) => {
            return next(ApiError.badRequest(error.message));
        });
};