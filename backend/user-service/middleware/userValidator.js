const { body, validationResult } = require('express-validator');
const User = require('../db/models/User');
const e = require('express');

const validateUser = () => {
    return [
        body('username')
            .notEmpty().withMessage("Username is required")
            .isLength({ min: 5, max: 12}).withMessage({
                errorLoc: "username",
                msg: "Username must be between 5 and 12 characters"
            })
            .custom(async value => {
                if (await User.findOne({ where: { username: value } })) {
                    throw new Error('Username is already in use')
                }
            }),
        body('password')
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8, max: 20 }).withMessage({
                errorLoc: "password",
                msg: "Password must be between 8 and 20 characters"
            }),
        handleErrors
    ];
};

const validateNewPassword = () => {
    return [
        body('newPassword')
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8, max: 20 }).withMessage("Password must be between 8 and 20 characters"),
        handleErrors
    ];
};

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        usernameErrorArray = errors.array().filter(el => el.msg.errorLoc === "username")
        passwordErrorArray = errors.array().filter(el => el.msg.errorLoc === "password")
        return res.status(400).json({ 
            usernameError: usernameErrorArray.map(el => el.msg.msg).join(' '),
            passwordError: passwordErrorArray.map(el => el.msg.msg).join(' ')
        });
    }

    next();
}

module.exports = {
    validateUser,
    validateNewPassword
};