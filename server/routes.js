const express = require("express");
/**
 * Routes générales.
 * Pour les routes vers les contrôleurs,
 * regarder dans le dossier /routes.
 */
const router = express.Router();
const sessionOk = require("./middleware/session");
const verify = require("./controllers/verify");
const user = require("./routes/user");
const post = require("./routes/post");
const comment = require("./routes/comment");

router.use("/user/", user);
router.use("/post/", post);
router.use("/comment/", comment);
router.get("/verify", sessionOk, verify);

module.exports = router;
