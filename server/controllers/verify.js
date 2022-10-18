const verify = (req, res, next) => {
    return res.status(200).send("ok");
};
module.exports = verify;
