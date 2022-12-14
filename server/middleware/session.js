const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
require("dotenv").config();

/**
 * * session :
 * Middleware de validation de session (Auth) :
 * ajoute l'id de l'utilisateur à la requête
 * à partir du token créé à la connexion
 * de l'utilisateur.
 * @param {json} req The req object represents the HTTP request
 * and has properties for the request query string, parameters,
 * body, HTTP headers, and so on.
 * @param {json} res The res object represents the HTTP response
 * that an Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the
 * Express router which, when invoked, executes the middleware
 * succeeding the current middleware.
 */
const session = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;

        req.session = {
            userId: userId,
            userRole: userRole,
        };
        next();
    } catch (error) {
        return next(ApiError.forbidden(error.message));
    }
};
module.exports = session;
