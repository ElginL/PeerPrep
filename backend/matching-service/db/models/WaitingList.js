const { sq } = require('../db.js');
const { DataTypes } = require('sequelize');

const WaitingList = sq.define("WaitingList", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    socketId: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

WaitingList.sync({ force: true })
    .then(() => console.log("Waiting List model synced"));

module.exports = WaitingList;