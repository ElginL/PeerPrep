const express = require("express");
const http = require("http");
const ACTIONS = require("./Actions");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { testDbConnection } = require('./db/db');
const roomRepo = require('./db/repositories/RoomRepo');
const authenticateJwt = require('./middleware/authenticateJwt');
const cors = require('cors');

testDbConnection();

// server
const app = express();
const server = http.createServer(app);

app.use(express.json());
const corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST, DELETE, PUT',
    credentials: true
};
app.use(cors(corsOption));

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
    const roomId = socket.handshake.query.roomId;

    if (await roomRepo.getByRoomId(roomId) == null) {
        return next(new Error('Room does not exist'));
    }

    socket.roomId = roomId;

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
        if (getAllConnectedClients(socket.roomId).length == 0) {
            roomRepo.deleteById(socket.roomId);
        }

        console.log(`User disconnected: ${socket.id}`);
    });
});

app.post('/', authenticateJwt, async (req, res, next) => {
    const { roomId } = req.body;

    try {
        await roomRepo.addEntry(roomId);

        res.status(201).json({
            msg: "Successfully created"
        });
    } catch (e) {
        next(e);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ msg: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3004
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
