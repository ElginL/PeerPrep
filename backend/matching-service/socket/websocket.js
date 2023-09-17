const { instrument } = require('@socket.io/admin-ui')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const waitingListRepo = require('../db/repositories/waitingListRepo');
const roomRepo = require('../db/repositories/RoomRepo');

const initializeWebSocket = server => {
    const io = require('socket.io')(server, {
        cors: {
            origin: ['http://localhost:3000', 'https://admin.socket.io'],
            credentials: true
        },
    });

    io.use((socket, next) => {
        const token = socket.handshake.query.token;

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return next(new Error('Authentication Error'));
            }

            socket.username = decoded.username;
            next();
        });
    })

    io.on('connection', socket => {
        console.log(`User connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            roomRepo.deleteByUsername(socket.username);
            waitingListRepo.deleteByUsername(socket.username);
        });

        socket.on('joinQueue', async queueComplexity => {
            const otherUser = await waitingListRepo.getByComplexity(queueComplexity);

            // No other user queuing for that complexity yet.
            if (otherUser == null) {
                waitingListRepo.addEntry(socket.username, socket.id, queueComplexity);
                return;
            }

            roomRepo.addEntry(socket.username, otherUser.username, uuidv4());

            io.to(otherUser.socketId).emit('matchfound', socket.username);
            io.to(socket.id).emit('matchfound', otherUser.username);
        });
    });

    instrument(io, { auth: false });
};


module.exports = {
    initializeWebSocket,
};