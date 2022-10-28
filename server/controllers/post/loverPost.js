const ApiError = require("../../error/ApiError");
const PostModel = require("../../models/post");
const updatePost = require("../helpers/updatePost");

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
    PostModel.findOne({ _id: req.params.id })
        .then((post) => {
            let userLove = post.usersLoved.indexOf(req.session.userId);
            console.log(req.body);
            console.log("idPost = " + req.params.id);

            if (req.body.love == "1" && userLove == -1) {
                post.usersLoved.push(req.session.userId);
                post.loves = post.usersLoved.length;
                updatePost(req, res, post, "Post likée !");
            } else if (req.body.love == "0" && userLove != -1) {
                post.usersLoved.splice(userLove, 1);
                post.loves = post.usersLoved.length;
                updatePost(req, res, post, "Pas d'avis sur le post !");
            } else {
                return next(ApiError.badRequest("Bad request"));
            }
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = loverPost;
