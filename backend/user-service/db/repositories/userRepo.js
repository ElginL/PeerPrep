const User = require('../models/User');

const addUserInDb = (username, password) => {
    User.create({
        username,
        password
    });
};

const getUserByUsername = async username => {
    const user = await User.findByPk(username);

    if (user == null) {
        return null;
    }

    return user;
}

module.exports = {
    addUserInDb,
    getUserByUsername
};