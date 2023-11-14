const express = require('express');
const historyRouter = express.Router();
const historyController = require('../controllers/historyController');

// Fetch all questions answered by username
historyRouter.get('/history/:username', historyController.getAllAnsweredQuestionsByUsername)

// Add question to answered list
historyRouter.post('/add-answered-question', historyController.createAnsweredQuestion)

module.exports =  historyRouter;