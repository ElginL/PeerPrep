const AnsweredQuestion = require('../models/AnsweredQuestion');

const addAnsweredQuestionInDb = (questionId, questionTitle, complexity, username, answeredAt, isSolved) => {
    AnsweredQuestion.create({
        questionId,
        questionTitle,
        complexity,
        username,
        answeredAt,
        isSolved
    })
}

module.exports = addAnsweredQuestionInDb