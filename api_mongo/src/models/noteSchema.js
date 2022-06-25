const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('note', noteSchema);