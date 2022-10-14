const UserModel = require("../../models/user");
const bcrypt = require("bcrypt");
const ApiError = require("../../error/ApiError");
require("dotenv").config();

/**
 * * userSignUp :
 * Fonction pour ajouter un nouvel utilisateur à la BDD.
 * @param {json} req The req object represents the HTTP request and
 * has properties for the request query string, parameters, body,
 * HTTP headers, and so on.
 * @param {json} res The res object represents the HTTP response
 * that an Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the
 * Express router which, when invoked, executes the middleware
 * succeeding the current middleware.
 */
const userSignUp = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = new UserModel({
        ...req.body,
    });
    user.save()
        .then(() =>
            res.status(201).json({ message: "Utilisateur enregistré !" })
        )
        .catch((err) => {
            return next(err);
        });
};

module.exports = userSignUp;
