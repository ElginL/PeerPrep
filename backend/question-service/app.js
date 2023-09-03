const express = require('express');
const cors = require('cors');

const app = express();

const questions = [
    { id: 1, title: "Reverse a string", category: "Strings, Algorithms", complexity: "Easy", description: "A very long description" },
    { id: 2, title: "Linked List Cycle Detection", category: "Data Structures, Algorithms", complexity: "Easy", description: "Another long description" },
    { id: 3, title: "Rotate Image", category: "Arrays, Algorithms", complexity: "Medium", description: "hello world description" },
    { id: 4, title: "N-Queen Problem", category: "Algorithms", complexity: "Hard", description: "The N queen problem description" }
]

// middleware to parse json
app.use(express.json());

// enable cors for http://localhost:3000
const corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST'
};
app.use(cors(corsOption));

app.get('/', (req, res) => {
    res.json(questions);
});

app.post('/', (req, res) => {
    const newQuestion = req.body;
    console.log(newQuestion);

    questions.push(newQuestion);
    res.send("New question is saved");
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
})