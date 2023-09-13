const socketIo = require('socket.io');

let io;

const initializeWebSocket = server => {
    io = socketIo(server);

    io.on('connection', socket => {
        console.log(`User connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

const getSocketIoInstance = () => {
    if (!io) {
        throw new Error('Socket.io has not been initialized');
    }

    return io;
}

module.exports = {
    initializeWebSocket,
    getSocketIoInstance,
};