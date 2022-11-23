const UserModel = require("../../models/user");
const ApiError = require("../../error/ApiError");
const { Socket } = require("../../utils/socket");
require("dotenv").config();

const ajouterAmi = async (req, res, next) => {
    const myId = req.session.userId;
    const cibleId = req.params.id;

    UserModel.findOne({ _id: myId }).then((user) => {
        user.demandesEnvoyees.push(cibleId);
        UserModel.updateOne({ _id: myId }, user)
            .then(() => {
                Socket.has(myId) && Socket.to(myId, "myNewInfo", user);
            })
            .then(() => {
                UserModel.findOne({ _id: cibleId })
                    .then((user) => {
                        user.demandesAmis.push(myId);
                        UserModel.updateOne({ _id: cibleId }, user)
                            .then(() => {
                                Socket.has(cibleId) &&
                                    Socket.to(cibleId, "myNewInfo", user);
                                res.status(200).json({
                                    message: "Demande d'amis envoyée",
                                });
                            })
                            .catch((error) => {
                                return next(ApiError.badRequest(error.message));
                            });
                    })
                    .catch((err) => next(ApiError.notFound(err.message)));
            })
            .catch((error) => {
                return next(ApiError.badRequest(error.message));
            });
    });
};

module.exports = ajouterAmi;
