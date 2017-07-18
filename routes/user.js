
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
  
});

module.exports = router;
