const ApiError = require("../../error/ApiError");
const UserModel = require("../../models/user");

const getUsersInfo = (req, res, next) => {
    UserModel.find({ _id: { $in: req.body } })
        .then((users) => {
            const usersInfo = users.map((user) => {
                return {
                    userId: user._id,
                    avatar: user.avatar,
                    pseudo: user.pseudo,
                };
            });
            res.status(200).json(usersInfo);
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = getUsersInfo;
