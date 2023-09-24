// const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const ACTIONS = require("./Actions");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { testDbConnection } = require('./db/db');
const roomRepo = require('./db/repositories/RoomRepo');

testDbConnection();

// server
const app = express();
const server = http.createServer(app);

app.use(express.json());

const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:3000'],
        credentials: true
    },
});

const userSocketMap = {};

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.use((socket, next) => {
    const token = socket.handshake.query.token;

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new Error('Authentication Error'));
        }

        socket.username = decoded.username;
        next();
    });
});

io.use(async (socket, next) => {
    if (await roomRepo.getByUsername(socket.username) == null) {
        return next(new Error('Not authorized to enter room'));
    }

    next();
});

io.on("connection", (socket) => {
    socket.on(ACTIONS.JOIN, ({ roomId }) => {
        const clients = getAllConnectedClients(roomId);

        if (clients.length >= 2) {
            io.to(socket.id).emit(ACTIONS.JOIN_FAILED);
            return;
        }

        console.log(`${socket.username} connected to room ${roomId}`);

        userSocketMap[socket.id] = socket.username;
        socket.join(roomId);
        clients.push({ socketId: socket.id, username: socket.username });

        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username: socket.username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {
            code,
        });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, {
            code,
        });
    });

    socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });

    socket.on('disconnect', async () => {
        const room = await roomRepo.getByUsername(socket.username);
        const usernames = Object.values(userSocketMap);

        if (!usernames.includes(room.username1) && !usernames.includes(room.username2)) {
            roomRepo.deleteByUsername(socket.username);
        }

        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3004
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
