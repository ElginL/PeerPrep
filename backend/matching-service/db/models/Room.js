const { sq } = require('../db.js');
const { DataTypes } = require('sequelize');

const Room = sq.define("Room", {
    username1: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    socketId1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username2: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    socketId2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Room.sync({ force: true })
    .then(() => console.log("Room model synced"));

module.exports = Room;