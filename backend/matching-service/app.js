const express = require('express');
const http = require('http');
const cors = require('cors');
const matchRoute = require('./routes/matchRoute');
const { initializeWebSocket } = require('./socket/websocket');
const { testDbConnection } = require('./db/db');

testDbConnection();

// server
const app = express();
const server = http.createServer(app);

app.use(express.json());

// enable cors for http://localhost:3000
const corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST, DELETE'
};
app.use(cors(corsOption));
app.options('*', cors(corsOption));

app.use('/', matchRoute);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ msg: err.message || "Internal Server Error" });
});

initializeWebSocket();

server.listen(3003, () => {
    console.log('Server is running on http://localhost:3003')
});