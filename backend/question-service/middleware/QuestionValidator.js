const { body, validationResult } = require('express-validator');
const Question = require('../models/Question');

const validateQuestion = () => {
    return [
        body('title')
            .notEmpty().withMessage("Title is required")
            .custom(async value => {
                if (await Question.findOne({ title: value })) {
                    throw new Error('Question with this title already exists')
                }
            }),
        body('category').notEmpty().withMessage("Category is required"),
        body('complexity').isIn(['Easy', 'Medium', 'Hard']).withMessage("Invalid complexity"),
        body('description')
            .notEmpty().withMessage('Description is required')
            .custom(async value => {
                if (await Question.findOne({ description: value })) {
                    throw new Error('Question with this description already exists')
                }
            }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                errorMessage = errors.array().map(err => err.msg).join(", ");
                return res.status(400).json({ msg: errorMessage });
            }

            next();
        }
    ];
};

module.exports = {
    validateQuestion
};