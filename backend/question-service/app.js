const express = require('express');
const cors = require('cors');

const app = express();

const questions = [
    { id: 1, title: "Reverse a string", category: "Strings, Algorithms", complexity: "Easy",
        description: `Write a function that reverses a string. The input string is given as an array 
            of characters s. 
            
            You must do this by modifying the input array in-place with O(1) extra 
            memory. 
            
            Example 1: 
            
            Input: s = ["h","e","l","l","o"] 
            Output: ["o","l","l","e","h"] 
            Example 2: 
            
            Input: s = ["H","a","n","n","a","h"] 
            Output: ["h","a","n","n","a","H"] 
            
            Constraints: 
            
             1 <= s.length <= 105
             s[i] is a printable ascii character. ` },
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

// Fetch a question by id
app.get('/questions/:id', (req, res) => {
    const id = req.params.id;
    for (const question of questions) {
        if (question.id == id) {
            res.json(question);
            return;
        }
    }

    res.send("Question id does not exist")
});

// Fetch all questions
app.get('/', (req, res) => {
    res.json(questions);
});

// Add a question
app.post('/', (req, res) => {
    const newQuestion = req.body;
    console.log(newQuestion);

    questions.push(newQuestion);
    res.send("New question is saved");
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
})