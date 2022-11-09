const { Schema, model } = require('mongoose');
const User = require('./User.model');

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
    note: { type: String },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Birthday = model("Birthday", BdaySchema);

module.exports = Birthday;