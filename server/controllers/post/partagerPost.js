const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
const updatePost = require("../helpers/updatePost");

/**
 * * patagerPost :
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
const partagerPost = (req, res, next) => {
    PostModel.findOne({ _id: req.params.id })
        .then((post) => {
            let userShare = post.usersShared.indexOf(req.session.userId);

            if (req.body.share == "1" && userShare == -1) {
                post.usersShared.push(req.session.userId);
                post.shares = post.usersShared.length;
                updatePost(req, res, next, post, "Post partagé !");
            } else if (req.body.share == "0" && userShare != -1) {
                post.usersShared.splice(userShare, 1);
                post.shares = post.usersShared.length;
                updatePost(
                    req,
                    res,
                    next,
                    post,
                    "Le post n'est plus partagé !"
                );
            } else {
                return next(ApiError.badRequest("Bad request"));
            }
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = partagerPost;
