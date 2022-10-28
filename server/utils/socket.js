const { Server } = require("socket.io");
const io = new Server();
// io.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     next();
// });

const Socket = {
    emit: function (event, data) {
        // console.log(event, data);
        io.sockets.emit(event, data);
    },
};

io.on("connection", (socket) => {
    // console.log("A user connected");
    socket.on("disconnect", () => {
        // console.log("user disconnected");
    });
});

exports.Socket = Socket;
exports.io = io;
