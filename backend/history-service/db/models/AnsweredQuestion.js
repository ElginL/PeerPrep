const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/database');

const AnsweredQuestion = sequelize.define('AnsweredQuestion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    questionId: {
        type: DataTypes.STRING
    },
    questionTitle: {
        type: DataTypes.STRING
    },
    complexity: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    answeredAt: {
        type: DataTypes.DATE
    },
    isSolved: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'AnsweredQuestion'
});

AnsweredQuestion.sync()
    .then(() => console.log('Database table for history service (re)created.'));

module.exports = AnsweredQuestion;