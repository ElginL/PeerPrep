const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middleware/UserValidator');

userRouter.get('/', (req, res, next) => {
    res.json({ "messsage": "Hello "});
});

userRouter.post('/', validateUser(), userController.createUser);

module.exports = userRouter;