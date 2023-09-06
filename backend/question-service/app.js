const express = require('express');
const cors = require('cors');

const app = express();

let questions = [
    { id: 1, title: "Reverse a string", category: "Strings, Algorithms", complexity: "Easy",
        description: "Write a function that reverses a string. The input string is given as an array of characters s." },
    { id: 2, title: "Linked List Cycle Detection", category: "Data Structures, Algorithms", complexity: "Easy", description: "Another long description" },
    { id: 3, title: "Rotate Image", category: "Arrays, Algorithms", complexity: "Medium", description: "hello world description" },
    { id: 4, title: "N-Queen Problem", category: "Algorithms", complexity: "Hard", description: "The N queen problem description" }
];
let counter = 5;

// middleware to parse json
app.use(express.json());

// enable cors for http://localhost:3000
const corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST, DELETE'
};
app.use(cors(corsOption));

// Fetch a question by id
app.get('/questions/:id', (req, res) => {
    const id = req.params.id;
    for (const question of questions) {
        if (question.id == id) {
            res.status(200).json(question);
            return;
        }
    }

    res.send("Question id does not exist")
});

// Fetch all questions
app.get('/', (req, res) => {
    res.status(200).json(questions);
});

// Add a question
app.post('/', (req, res) => {
    const newQuestion = {
        id: counter++,
        ...req.body 
    };

    // check question duplicate
    for (const question of questions) {
        if (question.title === newQuestion.title) {
            res.status(400).send("Question with this title already exists");
            return;
        }

        if (question.description === newQuestion.description) {
            res.status(400).send("Question with this description already exists");
            return;
        }
    }

    questions.push(newQuestion);
    res.status(201).send("New question is saved");
});

// delete questions
app.delete('/', (req, res) => {
    const deleteIds = [...req.body.ids];

    questions = questions.filter(question => !deleteIds.includes(question.id));

    res.status(204).send("Questions deleted successfully");
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
});