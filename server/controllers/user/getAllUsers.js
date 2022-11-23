const ApiError = require("../../error/ApiError");
const UserModel = require("../../models/user");
const getAllUsers = (req, res, next) => {
    UserModel.find()
        .then((users) => {
            users = users.map(
                (user) =>
                    (user = {
                        _id: user._id,
                        avatar: user.avatar,
                        pseudo: user.pseudo,
                        bio: user.bio,
                    })
            );
            res.status(200).json(users);
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = getAllUsers;
