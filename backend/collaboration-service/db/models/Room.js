const { sq } = require('../db.js');
const { DataTypes } = require('sequelize');

const Room = sq.define("Room", {
    username1: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    username2: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    roomId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
});

Room.sync({ force: true })
    .then(() => console.log("Room model synced"));

module.exports = Room;