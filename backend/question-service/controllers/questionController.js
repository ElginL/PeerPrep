const Question = require('../models/Question');

const getQuestionById = (req, res, next) => {
    const id = req.params.id;

    Question.findById(id)
        .then(question => {
            if (!question) {
                return res.status(404).json({ error: 'Cannot find question' });
            }
            
            res.status(200).json(question);
        }).catch(err => next(err));
};

const getAllQuestions = (req, res, next) => {
    Question.find()
        .then(questions => res.status(200).json(questions))
        .catch(err => next(err));
};

const addQuestion = (req, res, next) => {
    const newQuestion = new Question(req.body);

    newQuestion.save()
        .then(question => {
            console.log('Question saved successfully: ' + question);
            res.status(201).send("Question saved successfully");
        })
        .catch(err => next(err));
};

const deleteQuestion = (req, res, next) => {
    const deleteIds = req.body.ids;

    Question.deleteMany({ _id: { $in: deleteIds }})
        .then(result => {
            res.status(204).send(`${result.deletedCount} questions were deleted successfully`);
        })
        .catch(err => next(err));
};

module.exports = {
    getQuestionById,
    getAllQuestions,
    addQuestion,
    deleteQuestion
};
