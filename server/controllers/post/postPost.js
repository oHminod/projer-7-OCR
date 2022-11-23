const UserModel = require("../../models/user");
const postHelper = require("../helpers/postHelper");

const postPost = async (req, res, next) => {
    const userId = req.session.userId;
    const idsToSendPost = req.app.locals[userId];

    if (idsToSendPost) {
        postHelper(req, res, next, idsToSendPost);
    } else {
        UserModel.findOne({ _id: userId })
            .then((user) => (req.app.locals[userId] = [...user.amis, userId]))
            .then(() => {
                postHelper(req, res, next, req.app.locals[userId]);
            });
    }
};

module.exports = postPost;
