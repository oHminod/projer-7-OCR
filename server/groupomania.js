const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const errorHandler = require("./error/error-handler");

const routes = require("./routes");

/**
 * Groupomania
 */
const groupomania = express();
groupomania.use(express.json());

/**
 * Connexion à la base de données.
 */
const mongoose = require("mongoose");
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@${process.env.DB_URL}/groupomania?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

/**
 * Mise en place des Headers
 */
groupomania.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

/**
 * Emplacement du dossier images.
 */
groupomania.use("/images", express.static(path.join(__dirname, "images")));

groupomania.use(helmet());
groupomania.use("/", routes);

groupomania.use(errorHandler);
module.exports = groupomania;
