const { Server } = require("socket.io");
const io = new Server();
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
require("dotenv").config();

const Socket = {
    emit: function (event, data) {
        // console.log(event, data);
        io.sockets.emit(event, data);
    },
};

const isValidJwt = (header) => {
    try {
        const token = header.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        if (decodedToken) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return next(ApiError.forbidden(error));
    }
};

io.use((socket, next) => {
    const header = socket.handshake.headers["authorization"];
    if (isValidJwt(header)) {
        return next();
    }
    return next(new Error("authentication error"));
});
io.on("connection", (socket) => {
    // console.log("utilisateur connecté");
    socket.on("likeAndLoves", (postObj) => {
        socket.broadcast.emit("likeAndLovesResponse", postObj);
    });
    // socket.on("room", (room) => {
    //     console.log(room);
    //     socket.join(room);
    // });
});

exports.Socket = Socket;
exports.io = io;
