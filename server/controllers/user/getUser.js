const ApiError = require("../../error/ApiError");
const UserModel = require("../../models/user");
const user = (req, res, next) => {
    if (req.params.id !== req.session.userId) {
        return next(ApiError.forbidden("Accès refusé !"));
    }
    UserModel.findOne({ _id: req.params.id })
        .then((user) => {
            res.status(200).json({
                _id: user._id,
                pseudo: user.pseudo,
                avatar: user.avatar,
                email: user.email,
                bio: user.bio,
                amis: user.amis,
                demandesAmis: user.demandesAmis,
                demandesEnvoyees: user.demandesEnvoyees,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                role: user.role,
            });
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
module.exports = user;
