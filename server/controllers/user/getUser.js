const ApiError = require("../../error/ApiError");
const UserModel = require("../../models/user");
const user = (req, res, next) => {
    UserModel.findOne({ _id: req.params.id })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = user;
