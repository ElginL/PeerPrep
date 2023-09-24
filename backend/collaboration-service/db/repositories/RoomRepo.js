const Room = require('../models/Room');

const addEntry = async (roomId) => {
    const room = await Room.findByPk(roomId);

    if (!room) {
        Room.create({
            roomId
        });
    }

};

const getByRoomId = async (roomId) => {
    const room = await Room.findByPk(roomId);

    if (room == null) {
        return null;
    }

    return room;
};

const deleteById = async (roomId) => {
    try {
        const room = await getByRoomId(roomId);

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
    getByRoomId,
    deleteById
};