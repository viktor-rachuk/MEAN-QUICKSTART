
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
	var newUser = new User({
		username = req.body.username;
		name = req.body.name;
		email = req.body.email;
		photo: req.body.photo;
		accounttype = req.body.accounttype;
		status = req.body.status;
		password: req.body.password;
	});

	newUser.createUser(newUser, (err, user) => {
		if(err) return res.json({ success: false, msg: 'Somethin went wrong!'});
		else {
			res.json({success: true, msg: 'Successfully created!!'});
		}
	});

});

// Get User By Id 
router.get('/:id', (req, res, next) => {
	User.findById(req.params.id, (err, user) => {
		if(err) return res.json({ success: false, error: err});
		else {
			return res.json({ success: true, user: user});
		}
	});
});

//Put User By Id


module.exports = router;
