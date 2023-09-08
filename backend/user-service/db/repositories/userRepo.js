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
};

const deleteUserByUsername = async username => {
    try {
        const user = await getUserByUsername(username);

        if (user == null) {
            return false;
        }

        await user.destroy();
        
        return true;
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = {
    addUserInDb,
    getUserByUsername,
    deleteUserByUsername
};