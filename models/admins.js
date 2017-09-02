const mongoose = require('mongoose');
const config = require('../config/database');

// Admin Schema
const AdminSchema = mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    permission: {
        type: String, //  inactive, active
        required: true
    }
});

module.exports = mongoose.model('Admin', AdminSchema);