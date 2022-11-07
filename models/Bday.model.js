const { Schema, model } = require('mongoose')

const BdaySchema = new Schema({
    name: {
        type: String,
        required
    },
    birthday: {
        type: string,
        format: date,
        required,
    },
    relationship: {
        type: String,
        required,
        enum: ['Spouse', 'Parent', 'sibling', 'realtive', 'friend', 'co-worker', 'manager/boss', 'acquaintances']
    },
    gender: {
        type: String,
        required,
        enum: ['male', 'female', 'undefined']
    },
    note: String,
});

const Birthday = model("Birthday", BdaySchema);

module.exports = Birthday;