const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    assigneeEmail: {
        type: String,
        ref: "users" // Reference to the user's email in the "users" collection
    },
    recipientEmail: {
        type: String,
        ref: "users" // Reference to the user's email in the "users" collection
    },
    priority: {
        type: String,   
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    progress: {
        type: String,
        // enum: ['Not started', 'Started', 'More time needed', 'Almost completed'],
        // default: 'Not started'
    }
}, { timestamps: true });


const taskdb = new mongoose.model('task', taskSchema);
module.exports = taskdb;
