const Room = require('../models/Room');

const addEntry = (username1, socketId1, username2, socketId2) => {
    Room.create({
        username1,
        socketId1,
        username2,
        socketId2
    });
};

const getByUsernames = async (username1, username2) => {
    const user = await WaitingList.findByPk(username1, username2);

    if (user == null) {
        return null;
    }

    return user;
};

const deleteByUsernames = async (username1, username2) => {
    try {
        const row = await getByUsernames(username1, username2);

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
    addEntry,
    getByUsernames,
    deleteByUsernames
};