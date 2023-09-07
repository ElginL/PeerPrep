const { 
    addUserInDb, 
    getUserByUsername, 
    deleteUserByUsername 
} = require('../db/repositories/userRepo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = (req, res, next) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }

        try {
            addUserInDb(username, hash);
    
            res.status(201).json({
                msg: "User created successfully"
            });
        } catch (e) {
            next(e);
        }
    });
}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const dbUser = await getUserByUsername(username);
    
        if (!dbUser) {
            res.status(401).json({ msg: "Username or password is invalid" });
        }
    
        bcrypt.compare(password, dbUser.password)
            .then(isCorrect => {
                if (!isCorrect) {
                    res.status(401).json({ msg: "Username or password is invalid" });
                }
    
                const token = jwt.sign({ 
                    username: dbUser.username, 
                    isManager: dbUser.isManager,
                }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
                res.status(200).json({ token });
            })
            .catch(e => next(e));
    } catch (e) {
        return next(e);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        if (await deleteUserByUsername(req.body.username)) {
            res.status(200).json({ msg: "User successfully deleted" });
        } else {
            res.status(404).json({ msg: "Delete failed, user not found" });
        }
    } catch (e) {
        next(e);
    }
};

module.exports = {
    createUser,
    loginUser,
    deleteUser
};