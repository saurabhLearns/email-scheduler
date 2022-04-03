const mongoose = require('mongoose');
const Constants = require('../../utils/constants')

const { Schema } = mongoose;

const Jobs = new Schema({
    email: { type: String, required: true },
    subject: String,
    body: String,
    execution_time: { type: Date, required: true },
    execution_status: { 
        type: String, 
        enum: Object.values(Constants.EXECUTION_STATUS), 
        default: Constants.EXECUTION_STATUS.PENDING 
    },
    executed_on: { type: Date, default: null },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
}, { strict: false });

module.exports = mongoose.model('jobs', Jobs, 'jobs');
