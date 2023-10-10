const express = require('express');
const http = require('http');
const cors = require('cors');
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

initializeWebSocket(server);

server.listen(3003, () => {
    console.log('Server is running on http://localhost:3003')
});