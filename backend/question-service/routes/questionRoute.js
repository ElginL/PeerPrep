const express = require('express');
const questionRouter = express.Router();
const questionController = require('../controllers/questionController');
const { validateQuestion } = require('../middleware/QuestionValidator');

// Fetch a question by id
questionRouter.get('/questions/:id', questionController.getQuestionById);

// Fetch all questions
questionRouter.get('/', questionController.getAllQuestions);

// Add a question
questionRouter.post('/', validateQuestion(), questionController.addQuestion);

// delete questions
questionRouter.delete('/', questionController.deleteQuestion);

module.exports = questionRouter;