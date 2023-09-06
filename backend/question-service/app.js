const express = require('express');
const cors = require('cors');
const questionRoute = require('./routes/questionRoute');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use("/", questionRoute);

// enable cors for http://localhost:3000
const corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST, DELETE'
};
app.use(cors(corsOption));

// db connection
mongoose.connect(
    process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on('error', console.error.bind("connection error: "));
db.once('open', function() {
    console.log("Connected successfully");
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
});