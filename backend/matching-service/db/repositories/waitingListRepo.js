const WaitingList = require('../models/WaitingList');

const addUsernameAndSocketId = (username, password) => {
    WaitingList.create({
        username,
        password
    });
};

const getByUsername = async username => {
    const user = await WaitingList.findByPk(username);

    if (user == null) {
        return null;
    }

    return user;
};

const deleteByUsername = async username => {
    try {
        const row = await getByUsername(username);

        if (row == null) {
            return false;
        }

        await row.destroy();
        
        return true;
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = {
    addUsernameAndSocketId,
    getByUsername,
    deleteByUsername
};