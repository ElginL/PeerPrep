const express = require("express");
const http = require("http");
const ACTIONS = require("./Actions");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { testDbConnection } = require("./db/db");
const roomRepo = require("./db/repositories/RoomRepo");
const collaborationRoute = require("./routes/collaborationRoute");
const cors = require("cors");
const clientMapRepo = require("./db/repositories/ClientMapRepo");

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

const io = require("socket.io")(server, {
    path: '/collaboration-service/socket.io',
    cors: {
        origin: ['http://localhost:3000'],
        credentials: true
    },
});

async function getAllConnectedClients(roomId) {
    const socketIds = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    const clientPromises = socketIds.map(async (socketId) => {
        const username = (await clientMapRepo.getBySocketId(socketId)).username;
        return { socketId, username };
    });

    return Promise.all(clientPromises);
}

io.use((socket, next) => {
    const token = socket.handshake.query.token;

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication Error"));
        }

        socket.username = decoded.username;
        next();
    });
});

io.use(async (socket, next) => {
    const roomId = socket.handshake.query.roomId;

    if ((await roomRepo.getByRoomId(roomId)) == null) {
        return next(new Error("Room does not exist"));
    }

    socket.roomId = roomId;

    next();
});

io.on("connection", (socket) => {
    socket.on(ACTIONS.JOIN, async ({ roomId }) => {
        const clients = await getAllConnectedClients(roomId);

        if (clients.length >= 2) {
            io.to(socket.id).emit(ACTIONS.JOIN_FAILED);
            return;
        }

        console.log(`${socket.username} connected to room ${roomId}`);

        socket.join(roomId);
        clientMapRepo.addEntry(socket.id, socket.username);
        clients.push({ socketId: socket.id, username: socket.username });

        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                socketId: socket.id,
                username: socket.username,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {
            code,
        });
    });

    socket.on(ACTIONS.CHANGE_LANGUAGE, ({ roomId, language }) => {
        socket.in(roomId).emit(ACTIONS.CHANGE_LANGUAGE, {
            language,
        });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, {
            code,
        });
    });

    socket.on(ACTIONS.EXECUTE_CODE, ({ roomId, result }) => {
        socket.in(roomId).emit(ACTIONS.EXECUTE_CODE, {
            result
        });
    });

    socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: clientMapRepo.getBySocketId(socket.id).username,
            });
        });
        clientMapRepo.deleteBySocketId(socket.id);
        socket.leave();
    });

    socket.on("disconnect", async () => {
        if (getAllConnectedClients(socket.roomId).length == 0) {
            roomRepo.deleteById(socket.roomId);
        }

        console.log(`User disconnected: ${socket.id}`);
    });
});

app.use("/collaboration-service", collaborationRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        msg: err.message || "Internal Server Error",
    });
});

const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
