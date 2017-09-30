const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const userController = require('../controllers/userController');


// Check email validation
router.post('/val_email', userController.check_email);
// Register
router.post('/register', userController.user_register);
// get user's childs
var childs = [];

function getChilds(id, done) {
    User.findOne({ _id: id }, (err, user) => {
        if (err) return done(err);
        let modelName;
        if (user) {
            if (user.accounttype == 'staff') {
                modelName = 'Staff';
            } else if (user.accounttype == 'customer') {
                modelName = 'Customer';
            }
            mongoose.model(modelName).findOne({ username: user.username }, (err, derived_user) => {
                if (err) return done(err);
                if (derived_user.child.length !== 0) {
                    for (let i = 0; i < derived_user.child.length; i++) {
                        childs.push(derived_user.child[i]);
                    }
                    for (let i = 0; i < derived_user.child.length; i++) {
                        return getChilds(derived_user.child[i], done);
                    }
                } else {
                    return done();
                }
            });
        } else {
            console.log('Error');
            return done();
        }
    });
}

// Get User By Id
router.get('/:id', userController.user_detail);

// Update User
router.put('/:id', userController.user_update);

// Authenticate
router.post('/authenticate', userController.user_authenticate);

// Get All Users
router.get('/', passport.authenticate('jwt', { session: false }), userController.user_list);


// Get All Staffs
router.post('/staffs', userController.user_staffs);

// Get All Customers
router.post('/customers', userController.user_customers);

// Inactivate Users With Ids
router.post('/inactivate', userController.user_inactivate);

// Activate Users With Ids
router.post('/activate', userController.user_activate);

// Delete Users With Ids
router.post('/delete', userController.user_delete);

// Get Staffs Of Customer user
router.post('/customer_staffs', userController.user_customer_staffs);


// Validate User email of password forgot user
router.post('/sen_code', userController.validate_email);

// Confirm User code
router.post('/con_code', userController.confirm_code);

// Reset password
router.post('/res_password', userController.reset_password);
module.exports = router;