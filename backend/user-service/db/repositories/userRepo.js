const User = require('../models/User');

const addUserInDb = (username, password) => {
    User.create({
        username,
        password
    });
};

module.exports = {
    addUserInDb
};