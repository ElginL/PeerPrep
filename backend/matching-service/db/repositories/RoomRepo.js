const Room = require('../models/Room');

const addEntry = async (roomId) => {
    const room = await Room.findByPk(roomId);

    if (!room) {
        Room.create({
            roomId
        });
    }
};

module.exports = {
    addEntry
};