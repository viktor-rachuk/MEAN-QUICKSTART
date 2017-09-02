const mongoose = require('mongoose');
const config = require('../config/database');

//Customer Schema
const CustomerSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    role: String,
    customer_info: {},
    companies_assigned: []
});

module.exports = mongoose.model('Customer', CustomerSchema);