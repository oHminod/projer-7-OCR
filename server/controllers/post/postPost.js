const postHelper = require("../helpers/postHelper");

const postPost = async (req, res, next) => {
    postHelper(req, res, next);
};

module.exports = postPost;
