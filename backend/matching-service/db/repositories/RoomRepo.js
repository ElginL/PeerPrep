const Room = require('../models/Room');

const addEntry = (username1, username2, roomId) => {
    Room.create({
        username1,
        username2,
        roomId
    });
};

module.exports = {
    addEntry
};