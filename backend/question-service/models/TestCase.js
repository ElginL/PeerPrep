const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const testCaseSchema = new Schema({
    input: Object,
    output: Schema.Types.Mixed
});

const TestCase = model('TestCase', testCaseSchema);

module.exports = TestCase;