const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");

/**
 * * updatePost :
 * Fonction pour mettre à jour (update) une sauce.
 * @param {json} req The req object represents the HTTP request
 * and has properties for the request query string, parameters,
 * body, HTTP headers, and so on.
 * @param {json} res The res object represents the HTTP response
 * that an Express app sends when it gets an HTTP request.
 * @param {json} post Les données fournies par cet objet
 * écraseront celles de la BDD.
 * @param {string} message Message de réussite.
 */
module.exports = (req, res, post, message) => {
    PostModel.updateOne({ _id: req.params.id }, post)
        .then(() => {
            console.log("status 200");
            res.status(200).json({ message: message });
        })
        .catch((error) => {
            return next(ApiError.badRequest(error.message));
        });
    console.log("post lové ou pas");
};