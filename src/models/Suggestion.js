const mongoose = require('mongoose');

const SuggestionSchema = mongoose.Schema({
    type: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true

    },
    fcmToken: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true

    },
    department: {
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
    ppUrl: {
        type: String,
        required: true

    },
    phoneNumber: {
        type: String,
        required: true

    },
    userId: {
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