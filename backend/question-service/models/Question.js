const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    complexity: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Easy',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    testCases: [
        {
            input: Object,
            output: Schema.Types.Mixed
        }
    ]
});

const Question = model('Question', questionSchema);

module.exports = Question;