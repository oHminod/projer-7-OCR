const ApiError = require("../../error/ApiError");
const UserModel = require("../../models/user");
const searchUser = (req, res, next) => {
    const query = req.body;

    UserModel.findOne({
        $or: [{ pseudo: query.query }, { email: query.query }],
    })
        .then((user) => {
            user = {
                _id: user._id,
                avatar: user.avatar,
                pseudo: user.pseudo,
                bio: user.bio,
                amis: user.amis,
                demandesAmis: user.demandesAmis,
            };
            res.status(200).json(user);
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = searchUser;
