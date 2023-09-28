const express = require('express');
const questionRouter = express.Router();
const questionController = require('../controllers/questionController');
const { authenticateJwt, authenticateManager} = require('../middleware/authenticateJwt');
const { validateQuestion } = require('../middleware/QuestionValidator');

// Fetch a question by id
questionRouter.get('/questions/:id', authenticateJwt, questionController.getQuestionById);

// Fetch all questions
questionRouter.get('/', authenticateJwt, questionController.getAllQuestions);

// Add a question
questionRouter.post('/', authenticateJwt, authenticateManager, validateQuestion(), questionController.addQuestion);

// delete questions
questionRouter.delete('/', authenticateJwt, authenticateManager, questionController.deleteQuestion);

// Get random question
questionRouter.get('/random', authenticateJwt, questionController.getRandomQuestion);

module.exports = questionRouter;