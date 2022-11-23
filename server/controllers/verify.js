const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = (req, res, next) => {
    const newToken = {
        token: jwt.sign(
            { userId: req.session.userId, userRole: req.session.userRole },
            process.env.TOKEN,
            {
                expiresIn: "1w",
            }
        ),
    };

    return res.status(200).json(newToken);
};
module.exports = verify;
