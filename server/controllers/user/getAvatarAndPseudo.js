const ApiError = require("../../error/ApiError");
const UserModel = require("../../models/user");

const getAvatarAndPseudo = (req, res, next) => {
    UserModel.findOne({ _id: req.params.id })
        .then((user) => {
            const userAvatarAndPseudo = {
                userId: user._id,
                avatar: user.avatar,
                pseudo: user.pseudo,
            };
            res.status(200).json(userAvatarAndPseudo);
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = getAvatarAndPseudo;
