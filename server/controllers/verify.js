const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = (req, res, next) => {
    const newToken = {
        token: jwt.sign({ userId: req.session.userId }, process.env.TOKEN, {
            expiresIn: "24h",
        }),
    };

    return res.status(200).json(newToken);
};
module.exports = verify;
