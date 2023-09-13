const express = require('express');
const matchRouter = express.Router();
const matchController = require('../controllers/matchController');
const authenticateJwt = require('../middleware/authenticateJwt');

matchRouter.post('/', authenticateJwt, matchController.attemptMatch);

matchRouter.post('/saveSocketId', authenticateJwt, matchController.saveSocketId);

matchRouter.get('/', matchController.addToQueue);

matchRouter.get('/consume', matchController.consumeFromQueue);

module.exports = matchRouter;