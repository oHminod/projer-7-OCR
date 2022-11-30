const deletehelper = require("../helpers/deletehelper");

/**
 * * deletePost :
 * Fonction pour supprimer (delete) un post de la BDD,
 * supprime également son image dans le file system.
 * @param {json} req The req object represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers,
 * and so on.
 * @param {json} res The res object represents the HTTP response that an
 * Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the Express
 * router which, when invoked, executes the middleware succeeding the
 * current middleware.
 */
const deletePost = (req, res, next) => {
    deletehelper(req, res, next);
};
module.exports = deletePost;
