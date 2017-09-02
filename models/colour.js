const mongoose = require('mongoose');
const config = require('../config/database');

// Colour Schema
const ColourSchema = mongoose.Schema({
    name: {
	    type: String,
	    unique: true,
	    required: true
  	},
    status: Boolean,
    unittypes_assigned: [],
    area: []
});

module.exports = mongoose.model('Colour', ColourSchema);