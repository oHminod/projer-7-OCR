const ApiError = require("../../error/ApiError");
const UserModel = require("../../models/user");
const loverhelper = require("../helpers/loverhelper");

/**
 * * likerSauce :
 * Fonction pour mettre à jour (update) les like d'une sauce.
 * @param {json} req The req object represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers,
 * and so on.
 * @param {json} res The res object represents the HTTP response that an
 * Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the Express
 * router which, when invoked, executes the middleware succeeding the current
 * middleware.
 */
const loverPost = (req, res, next) => {
    const userId = req.session.userId;
    const idsToSendPost = req.app.locals[userId];

    if (idsToSendPost) {
        loverhelper(req, res, next, idsToSendPost);
    } else {
        UserModel.findOne({ _id: userId })
            .then((user) => (req.app.locals[userId] = [...user.amis, userId]))
            .then(() => {
                loverhelper(req, res, next, req.app.locals[userId]);
            });
    }
};
module.exports = loverPost;
