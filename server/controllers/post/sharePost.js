const UserModel = require("../../models/user");
const sharehelper = require("../helpers/sharehelper");

/**
 * * sharePost :
 * Fonction pour partager un post de la BDD,
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
const sharePost = (req, res, next) => {
    const userId = req.body.post.userId;
    const idsToSendPost = req.app.locals[userId];

    if (idsToSendPost) {
        sharehelper(req, res, next, idsToSendPost);
    } else {
        UserModel.findOne({ _id: userId })
            .then((user) => (req.app.locals[userId] = [...user.amis, userId]))
            .then(() => {
                sharehelper(req, res, next, req.app.locals[userId]);
            });
    }
};
module.exports = sharePost;
