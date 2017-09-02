const mongoose = require('mongoose');
const config = require('../config/database');

// Company Schema
const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: String,
    status: Boolean,
    is_debtor: Boolean,
    logo: String,
    company_info: {},
    parent: String,
    child: [],
    assigned_stores: [],
    key_contacts: [],
    account_info : {}
});

module.exports = mongoose.model('Company', CompanySchema);