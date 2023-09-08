const { body, validationResult } = require('express-validator');
const User = require('../db/models/User');

const validateUser = () => {
    return [
        body('username')
            .notEmpty().withMessage("Username is required")
            .custom(async value => {
                if (await User.findOne({ where: { username: value } })) {
                    throw new Error('Username is already in use')
                }
            }),
        body('password').notEmpty().withMessage("Password is required"),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                errorMessage = errors.array().map(err => err.msg).join(", ");
                return res.status(400).json({ msg: errorMessage });
            }

            next();
        }
    ];
};

module.exports = {
    validateUser
};