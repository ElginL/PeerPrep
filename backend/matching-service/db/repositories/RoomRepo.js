const Room = require('../models/Room');
const { Op } = require('sequelize');

const addEntry = (username1, username2, roomId) => {
    Room.create({
        username1,
        username2,
        roomId
    });
};

const getByUsername = async (username) => {
    const room = await Room.findOne({
        where: {
            [Op.or]: [
                { username1: username },
                { username2: username }
            ]
        }
    });

    if (room == null) {
        return null;
    }

    return room;
};

const deleteByUsername = async (username) => {
    try {
        const room = await getByUsername(username);

        if (room == null) {
            return false;
        }

        await room.destroy();
        
        return true;
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = {
    addEntry,
    getByUsername,
    deleteByUsername
};