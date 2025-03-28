const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    yearofExperience: {
        type: Number,
        required: true
    },
    reportingManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);