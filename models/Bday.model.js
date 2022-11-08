const { Schema, model } = require('mongoose')

const BdaySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    relationship: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    note: String,
});

const Birthday = model("Birthday", BdaySchema);

module.exports = Birthday;