const { Socket } = require("./socket");

module.exports = (idsToSendPost, event, objectToSend) => {
    idsToSendPost.map(
        (room) => Socket.has(room) && Socket.to(room, event, objectToSend)
    );
};
