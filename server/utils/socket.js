const { Server } = require("socket.io");
const io = new Server();
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
require("dotenv").config();

const Socket = {
    emit: (event, data) => {
        io.sockets.emit(event, data);
    },
    to: (room, event, data) => {
        io.to(room).emit(event, data);
    },
    // Chaque browser connecté avec un utilisateur donné est dans
    // une room nommée avec l'id de l'utilisateur. (première implémentation)
    has: (room) => {
        return io.sockets.adapter.rooms.has(room);
    },
};

const userAuth = (header, userId) => {
    try {
        const token = header.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        // console.log(decodedToken.userRole);

        if (decodedToken && decodedToken.userId === userId) {
            return true;
        } else {
            return false;
        }
    } catch {
        return next(ApiError.unauthorized("Token invalide"));
    }
};

let userId = "";
io.use((socket, next) => {
    const header = socket.handshake.headers["authorization"];
    userId = socket.handshake.headers["userid"];

    if (userAuth(header, userId)) {
        return next();
    }
    return next(ApiError.forbidden("Accès interdit"));
});

io.on("connection", (socket) => {
    // console.log(req.app.locals);
    // Connexion à la room de l'utilisateur après vérification de l'id avec le token
    socket.join(userId);
    // console.log(io.sockets.adapter.rooms.has("6351f4ae3f4026d3035f9ebd"));

    socket.on("disconnect", () => {
        // console.log("Un utilisateur s'est déconnecté");
    });
});
exports.Socket = Socket;
exports.io = io;
