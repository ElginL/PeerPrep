const Question = require('../models/Question');
const TestCase = require('../models/TestCase');

const getQuestionById = (req, res, next) => {
    const id = req.params.id;

    Question.findById(id)
        .populate('testCases')
        .exec()
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
    const savedTestCases = [];

    const testCasesPromises = req.body.inputs.map(async (input, index) => {
        const newTestCase = new TestCase({
            input: input,
            output: req.body.outputs[index]
        });

        const savedTestCase = await newTestCase.save();
        savedTestCases.push(savedTestCase._id);
    });

    Promise.all(testCasesPromises)
        .then(() => {
            const newQuestion = new Question({
                title: req.body.title,
                category: req.body.category,
                complexity: req.body.complexity,
                description: req.body.description,
                codeTemplate: req.body.codeTemplate,
                testCases: savedTestCases
            });

            return newQuestion.save();
        })
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

const getRandomQuestion = (req, res, next) => {
    const complexity = req.params.complexity;

    Question.aggregate([
        { $match: { complexity: complexity } },
        { $sample: { size: 1 } }
    ])
    .then(question => res.status(200).json(question[0]))
    .catch(err => next(err));
};

module.exports = {
    getQuestionById,
    getAllQuestions,
    addQuestion,
    deleteQuestion,
    getRandomQuestion
};
