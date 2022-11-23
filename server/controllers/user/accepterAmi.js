const UserModel = require("../../models/user");
const ApiError = require("../../error/ApiError");
const { Socket } = require("../../utils/socket");
require("dotenv").config();

const accepterAmi = async (req, res, next) => {
    const myId = req.session.userId;
    const cibleId = req.params.id;

    UserModel.findOne({ _id: myId })
        .then((user) => {
            user.demandesAmis = user.demandesAmis.filter(
                (id) => id !== cibleId
            );
            user.amis = [...user.amis, cibleId];
            UserModel.updateOne({ _id: myId }, user)
                .then(() => {
                    Socket.has(myId) && Socket.to(myId, "myNewInfo", user);
                    req.app.locals[myId] = [...user.amis, myId];
                })
                .catch((error) => {
                    return next(ApiError.badRequest(error.message));
                });
        })
        .then(() => {
            UserModel.findOne({ _id: cibleId }).then((user) => {
                user.amis = [...user.amis, myId];
                user.demandesEnvoyees = user.demandesEnvoyees.filter(
                    (id) => id !== myId
                );
                UserModel.updateOne({ _id: cibleId }, user)
                    .then(() => {
                        Socket.has(cibleId) &&
                            Socket.to(cibleId, "myNewInfo", user);
                        req.app.locals[cibleId] = [...user.amis, cibleId];
                        res.status(200).json({
                            message: "Ajouté à la liste d'amis",
                        });
                    })
                    .catch((error) => {
                        return next(ApiError.badRequest(error.message));
                    });
            });
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};

module.exports = accepterAmi;
