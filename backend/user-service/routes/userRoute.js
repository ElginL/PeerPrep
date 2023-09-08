const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middleware/UserValidator');
const authenticateJwt = require('../middleware/authenticateJwt');

userRouter.post('/register', validateUser(), userController.createUser);

userRouter.post('/login', userController.loginUser);

userRouter.delete('/deregister', authenticateJwt, userController.deleteUser);

module.exports = userRouter;