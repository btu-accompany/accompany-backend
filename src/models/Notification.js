const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    senderName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    receivers: {
        type: Array,
    }
});

module.exports = mongoose.model("Notification", NotificationSchema);