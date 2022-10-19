const ApiError = require("../../error/ApiError");
const UserModel = require("../../models/user");
const user = (req, res, next) => {
    if (req.params.id !== req.session.userId) {
        return next(ApiError.forbidden("Accès refusé !"));
    }
    UserModel.findOne({ _id: req.params.id })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = user;
