const { addUserInDb } = require('../db/repositories/userRepo');

const createUser = (req, res, next) => {
    const newUser = req.body;

    try {
        addUserInDb(newUser.username, newUser.password);
        
        res.status(201).json({
            msg: "User created successfully"
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    createUser
}