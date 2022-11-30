const { Socket } = require("./socket");

module.exports = (idsToSendPost, event, objectToSend) => {
    // const curatedRooms = idsToSendPost.filter((room) => Socket.has(room));
    // Socket.to(curatedRooms, event, objectToSend);
    Socket.emit(event, objectToSend);
};
