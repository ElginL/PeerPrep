const AnsweredQuestion = require('../db/models/AnsweredQuestion');
const addAnsweredQuestionInDb = require('../db/repositories/historyRepo');

const createAnsweredQuestion = (req, res) => {
    const {questionId, questionTitle, complexity, username, answeredAt, isSolved } = req.body;

    try {
        console.log(isSolved)
        addAnsweredQuestionInDb(questionId, questionTitle, complexity, username, answeredAt, isSolved);

        res.status(201).json({
            success: "Question added to " + username + "'s history",
        });
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

const getAllAnsweredQuestionsByUsername = async (req, res) => {
    const username = req.params.username;
    
    const answeredQuestions = await AnsweredQuestion.findAll({
        where: {
            username: username
        },
        raw: true
    })
    
    res.status(200).json(answeredQuestions);
}

module.exports = { createAnsweredQuestion, getAllAnsweredQuestionsByUsername };