const mongoose = require('mongoose');


const SuggestionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    surname: {
        type: String,
        required: true

    },
    topic: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true

    },

    phoneNumber: {
        type: String,
        required: true

    },
    userDepartment: {
        type: String,
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('suggestions', SuggestionSchema);