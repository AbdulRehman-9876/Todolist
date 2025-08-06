const mongoose = require('mongoose');
const todolistSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});
module.exports = mongoose.model('todolist',todolistSchema); 