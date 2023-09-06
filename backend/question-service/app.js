const express = require('express');
const cors = require('cors');
const questionRoute = require('./routes/questionRoute');

const app = express();

app.use(express.json());

app.use("/", questionRoute);

// enable cors for http://localhost:3000
const corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST, DELETE'
};
app.use(cors(corsOption));

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
});