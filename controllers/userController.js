const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const User = require('../models/user');
const Role = require('../models/role');
const Staff = require('../models/staff');
const Customer = require('../models/customer');
const Company = require('../models/company');
const Store = require('../models/stores');
const mg = require('nodemailer-mailgun-transport');
const EmailTemplate = require('email-templates').EmailTemplate;
const pug = require('pug');
const path = require('path');
const api_key = 'key-7b5976bf90fc90de4defde1087ac58b5';
const domain = 'commercial.carpetcourt.nz';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
// validate user email exist
exports.validate_email = (req, res) => {
    const templateDir = appRoot + '/public/template/password/';
    const myTemplate = new EmailTemplate(templateDir);
    const email = req.body.email;
    const code = Date.now();
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.json({success: false, msg: 'User Not Exist!'});
        if (user) {
            myTemplate.render({
                'code': code,
                'username': user.username
            }, (err, result) => {
                var data = {
                    from: 'Carpet Court Commercial<postmaster@commercial.carpetcourt.nz>',
                    to: email,
                    subject: ' Carpet Court: Forgot Password Confirmation Code',
                    text: ' Carpet Court: Forgot Password Confirmation Code',
                    html: result.html
                };
                mailgun.messages().send(data, function(error, body) {
                    if (error) return res.json({ success: false, msg: error });
                    user.token = code;
                    user.save((save_err, saved_user) => {
                        if (save_err) return res.json({success: false, msg: 'User not Exist'});
                        return res.json({
                            success: true,
                            msg: 'Your confirmation code has been emailed to you. Please check your mail and enter the confirmation code into the field below.'
                        });
                    });
                });
            });
        } else {
            return res.json({success: false, msg: 'Sorry, you entered an email that does not exist!'});
        }
    });
};


// check email already exist
exports.check_email = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.json({success: true, msg: err});
        if (user) {
            return res.json({success: false, msg: 'Email invalid!'});
        } else {
            return res.json({success: true, msg: 'Email valid!'});
        }
    });
};
// confirm code
exports.confirm_code = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.json({success: false, msg: 'User not exist'});
        if (user.token === req.body.code) {
            return res.json({success: true, msg: 'Code confirmed'});
        } else {
            return res.json({success: false, msg: 'Please try again!'});
        }
    });
};

// reset password
exports.reset_password = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.json({success: false, msg: 'User not exist'});
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                user.password = hash;
                user.save((save_err, saved_user) => {
                    if (save_err) return res.json({success: false, msg: 'User not exist!'});
                    return res.json({success: true, msg: 'Reset Password Successfully!'});
                });
            });
        });
    });
};
// get all users
exports.user_list = (req, res) => {
    User.find({ accounttype: { $ne: 'super' } }, { password: 0 }, function(err, users) {
        if (err) return res.json({ success: false, error: err });
        Customer.find({}, (error, customers) => {
            if (error) return res.json({ success: false, error: error });
            for (let i = 0; i < customers.length; i++) {
                for (let j = 0; j < users.length; j++) {
                    if (customers[i].username === users[j].username) {
                        users[j]['temp'] = customers[i].companies_assigned;
                    }
                }
            }
            users = sortByKey(users, 'username');
            res.json(users);
        });
    });
};

// create new user
exports.user_register = function(req, res) {
    const accounttype = req.body.accounttype;
    let logo = req.body.logo;
    let photo = req.body.photo;
    if (!req.body.logo) {
        logo = 'default-logo.png';
    }
    if (!req.body.photo) {
        photo = 'default-photo.jpg';
    }
    // Create User to register users table
    User.findOne({ username: req.body.username }, (err, newUser) => {
        if (err) return res.json({ success: false, msg: err });
        // existing user found, stop registeration, return error message
        if (newUser) {
            res.json({
                success: false,
                msg: 'User already existed'
            });
            return;
        }
        //Create New User
        var newUser = new User({
            user_info: req.body.user_info,
            username: req.body.username,
            accounttype: req.body.accounttype,
            email: req.body.email,
            photo: photo,
            special_permissions: req.body.special_permissions,
            status: req.body.status,
            password: req.body.password,
            temp: req.body.temp
        });
        // console.log( JSON.stringify( req.body.user_info ));
        User.addUser(newUser, (err, user) => {
            if (err) return res.json({ success: false, error: err });
            if (accounttype === 'staff') {
                let newStaff = new Staff({
                    username: req.body.username,
                    stores_assigned: req.body.stores_assigned,
                    role: req.body.role_name,
                });
                Staff.create(newStaff, function(err, staff) {
                    if (err) return res.json({ success: false, error: err });
                    const stores_assigned = req.body.stores_assigned;
                    for (let i = 0; i < stores_assigned.length; i++) {
                        Store.findById(stores_assigned[i], (error, store) => {
                            if (error) return res.json({ success: false, error: error });
                            if (store) {
                                store.assigned_users.push(staff._id.toString());
                                let assigned_users = Array.from(new Set(store.assigned_users));
                                store.assigned_users = assigned_users;
                                store.save((err, updated_store) => {
                                    if (err) return res.json({ success: false, msg: err });
                                });
                            } else {
                                return res.json({ success: false, error: error });
                            }
                        });
                    }
                    res.json({
                        success: true,
                        msg: 'Successfully Added!'
                    });
                });
            }
            if (accounttype === 'customer') {
                /** if req.body === null, them  */
                let newCustomer = new Customer({
                    username: req.body.username,
                    role: req.body.role_name,
                    companies_assigned: req.body.companies_assigned,
                    customer_info: req.body.customer_info
                });
                Customer.create(newCustomer, function(err, customer) {
                    if (err) return res.json({ success: false, error: err });
                    res.json({
                        success: true,
                        msg: 'Successfully Added!'
                    });

                });
            }
        });
    });
};

// get user detail according to each user type
exports.user_detail = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.json({ success: false, error: err });
        // res.json(user);
        if (user) {
            if (user.accounttype === 'super') {
                res.json({
                    success: true,
                    user: {
                        userid: user._id,
                        username: user.username,
                        accounttype: user.accounttype,
                        email: user.email,
                        user_info: user.user_info
                    }
                });
            }
            if (user.accounttype === 'staff') {
                Staff.findOne({ username: user.username }, (err, staff) => {
                    if (err) return res.json({ success: false, error: err });
                    if (user.special_permissions) {
                        res.json({
                            success: true,
                            user: {
                                userid: user._id,
                                id: staff._id,
                                photo: user.photo,
                                username: user.username,
                                accounttype: user.accounttype,
                                status: user.status,
                                email: user.email,
                                stores_assigned: staff.stores_assigned,
                                special_permissions: user.special_permissions,
                                company: user.company,
                                user_info: user.user_info,
                                role: staff.role,
                            },
                        });
                    } else {
                        res.json({
                            success: true,
                            user: {
                                userid: user._id,
                                id: staff._id,
                                photo: user.photo,
                                username: user.username,
                                accounttype: user.accounttype,
                                email: user.email,
                                status: user.status,
                                stores_assigned: staff.stores_assigned,
                                company: user.company,
                                user_info: user.user_info,
                                role: staff.role,
                            },
                        });
                    }
                });
            }
            if (user.accounttype === 'customer') {
                Customer.findOne({ username: user.username }, (err, customer) => {
                    if (err) return res.json({ success: false, error: err });
                    if (user.special_permissions) {
                        res.json({
                            success: true,
                            user: {
                                userid: user._id,
                                id: customer._id,
                                username: user.username,
                                accounttype: user.accounttype,
                                photo: user.photo,
                                logo: customer.logo,
                                company: user.company,
                                email: user.email,
                                companies_assigned: customer.companies_assigned,
                                special_permissions: user.special_permissions,
                                user_info: user.user_info,
                                customer_info: customer.customer_info,
                                role: customer.role
                            },
                        });
                    } else {
                        // console.error(childs);
                        res.json({
                            success: true,
                            user: {
                                userid: user._id,
                                id: customer._id,
                                username: user.username,
                                accounttype: user.accounttype,
                                photo: user.photo,
                                companies_assigned: customer.companies_assigned,
                                email: user.email,
                                company: user.company,
                                user_info: user.user_info,
                                customer_info: customer.customer_info,
                                role: customer.role
                            },
                        });
                    }
                });
            }
        } else {
            return res.json({ success: false, msg: 'Cannot find user' });
        }
    });
};

// update user according to each user type
exports.user_update = (req, res) => {
    let id = req.params.id; // if user staff , this is staff id , if user is customer, this is cusomer id. req.body.userid is user's id in users table.
    let content = req.body;
    if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.json({ success: false, msg: err });
                content.password = hash;
                if (req.body.accounttype === 'super') {
                    User.findByIdAndUpdate(req.body.userid, content, (err, user) => {
                        if (err) return res.json({ success: false, msg: 'Error' });
                        return res.json({ success: true, msg: 'Success' });
                    });
                } else {
                    if (req.body.special_permissions) {
                        User.findByIdAndUpdate(req.body.userid, content, (err, user) => {
                            if (err) return res.json({ success: false, msg: 'Error' });
                            if (req.body.accounttype === 'staff') {
                                updateStaff(id);
                            }
                            if (req.body.accounttype === 'customer') {
                                updateCustomer(id);
                            }
                        });
                    } else {
                        User.findByIdAndUpdate(req.body.userid, content, { $unset: { special_permissions: 1, }, }, (err, user) => {
                            if (err) return res.json({ success: false, msg: 'Error' });
                            if (req.body.accounttype === 'staff') {
                                updateStaff(id);
                            }
                            if (req.body.accounttype === 'customer') {
                                updateCustomer(id);
                            }
                        });
                    }
                }
            });
        });
    } else {
        if (req.body.accounttype === 'super') {
            User.findByIdAndUpdate(req.body.userid, content, (err, user) => {
                if (err) return res.json({ success: false, msg: 'Error' });
                return res.json({ success: true, msg: 'Success' });
            });
        } else {
            if (req.body.special_permissions) {
                // console.log(req.body)
                User.findByIdAndUpdate(req.body.userid, content, (err, user) => {
                    if (err) return res.json({ success: false, msg: 'Error' });
                });
                if (req.body.accounttype === 'staff') {
                    updateStaff(id);
                }
                if (req.body.accounttype === 'customer') {
                    updateCustomer(id);
                }
            } else {
                User.findByIdAndUpdate(req.body.userid, content, { $unset: { special_permissions: 1, }, }, (err, user) => {
                    if (err) return res.json({ success: false, msg: 'Error' });
                    if (req.body.accounttype === 'staff') {
                        updateStaff(id);
                    }
                    if (req.body.accounttype === 'customer') {
                        updateCustomer(id);
                    }
                });
            }
        }
    }

    function updateStaff(staff_id) {
        Staff.findByIdAndUpdate(staff_id, content, (err, staff) => {
            if (err) return res.json({ success: false, msg: err });
            if (staff) {
                const currentStores = staff.stores_assigned;
                const diff = currentStores.filter(function(x) {
                    return req.body.stores_assigned.indexOf(x) < 0
                });
                if (diff.length !== 0) {
                    for (let i = 0; i < diff.length; i++) {
                        Store.findById(diff[i], (err, store, callback) => {
                            if (store) {
                                for (let j = 0; j < store.assigned_users.length; j++) {
                                    if (store.assigned_users[j] === staff_id) {
                                        store.assigned_users.splice(j, 1);
                                        store.save((save_err, updatedStore) => {
                                            if (save_err) return res.json({ success: false, msg: save_err });
                                            //return res.json({success: false, msg: 'Cannot Save Store'});
                                            // return res.json({success: true, msg: 'Staff User Updated!!!'});
                                        });
                                    }
                                }
                                // store.assigned_users.splice(store.assigned_users.indexOf(staff._id.toString()), 1);
                            } else {
                                callback(); // error process
                                // return res.json({success: false, msg: 'Cannot Save Store'});
                            }
                        });
                    }
                }

                if (req.body.stores_assigned.length !== 0) {
                    for (let i = 0; i < req.body.stores_assigned.length; i++) {
                        Store.findById(req.body.stores_assigned[i], (err, store, callback) => {
                            if (store) {
                                store.assigned_users.push(staff_id);
                                const users = Array.from(new Set(store.assigned_users));
                                store.assigned_users = users;
                                store.save();
                            } else {
                                callback();
                                // return res.json({success: false, msg: 'Cannot Save Store'});
                            }
                        });
                    }
                }

                return res.json({ success: true, msg: 'Success!!' });
            } else {
                return res.json({ success: false, msg: 'Cannot Find Staff' });
            }
        });
    }

    function updateCustomer(customer_id) {
        Customer.findByIdAndUpdate(id, content, (err, customer) => {
            if (err) return res.json({ success: false, msg: err });
            res.json({ success: true, msg: 'Success' });
        });
    }
};

// get all staff users
exports.user_staffs = (req, res) => {
    Staff.find({}, (err, staffs) => {
        if (err) return res.json({ success: false, msg: err });
        staffs = sortByKey(staffs, 'username');
        res.json(staffs);
    });
};


// get all customer users
exports.user_customers = (req, res) => {
    Customer.find({}, (err, customers) => {
        if (err) return res.json({ success: false, msg: err });
        const customer_users = [];
        for (let i = 0; i < req.body.length; i++) {
            for (let j = 0; j < customers.length; j++) {
                if (customers[j]['companies_assigned'].indexOf(req.body[i]) !== -1) {
                    customer_users.push(customers[j]);
                }
            }
        }
        User.find({}, (error, users) => {
            let respond_users = [];
            if (error) return res.json({ success: false, msg: err });
            for (let i = 0; i < users.length; i++) {
                for (let j = 0; j < customer_users.length; j++) {
                    if (users[i]['username'] === customer_users[j]['username']) {
                        const user = {};
                        user['_id'] = users[i]['_id'];
                        user['username'] = users[i]['username'];
                        user['accounttype'] = 'customer';
                        user['status'] = users[i]['status'];
                        user['companies_assigned'] = customer_users[j]['companies_assigned'];
                        respond_users.push(user);
                    }
                }
            }
            respond_users = sortByKey(respond_users, 'username');
            res.json(respond_users);
        });
    });
};

// authenticate user with username or email and password
exports.user_authenticate = (req, res) => {
    const username = req.body.username;
    const useremail = req.body.email;
    const password = req.body.password;
    var query = {};
    if (username) {
        query['username'] = username;
    } else if (useremail) {
        query['email'] = useremail;
    }
    User.findOne(query, (err, user) => {
        if (err) return res.json({ success: false, error: err });
        if (!user) {
            return res.json({
                success: false,
                msg: 'User not found',
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) return res.json({ success: false, error: err });
            if (isMatch && user.status === true) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800, // 1 week
                });
                if (user.accounttype === 'super') {
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            accounttype: user.accounttype,
                        },
                    });
                }
                if (user.accounttype === 'staff') {
                    Staff.findOne({ username: user.username }, (err, staff) => {
                        if (err) return res.json({ success: false, error: err });
                        Role.findOne({ role_name: staff.role }, (err, roledata) => {
                            if (err) return res.json({ success: false, error: err });
                            res.json({
                                success: true,
                                token: 'JWT ' + token,
                                user: {
                                    id: user._id,
                                    username: user.username,
                                    photo: user.photo,
                                    email: user.email,
                                    user_info: user.user_info,
                                    stores_assigned: staff.stores_assigned,
                                    special_permissions: user.special_permissions,
                                    accounttype: user.accounttype,
                                    role: roledata,
                                },
                            });
                        });
                    });
                }
                if (user.accounttype === 'customer') {
                    Customer.findOne({ username: user.username }, (err, customer) => {
                        if (err) return res.json({ success: false, error: err });
                        if (customer.companies_assigned.length !== 0) {
                            Company.find({ _id: { $in: customer.companies_assigned } }, (error, companies) => {
                                var logo = '';
                                var index;
                                for (let i = 0; i < companies.length; i++) {
                                    if (companies[i].parent === '') {
                                        logo = companies[i].logo;
                                        break;
                                    }
                                    var exist = false;
                                    for (let j = 0; j < companies.length; j++) {
                                        if (companies[i].parent === companies[j]._id) {
                                            exist = true;
                                            break;
                                        }
                                    }
                                    if (exist === false) {
                                        logo = companies[i].logo;
                                        index = i;
                                        break;
                                    }
                                }
                                if (index === -1) {
                                    logo = companies[0].logo;
                                }
                                Role.findOne({ role_name: customer.role }, (err, roledata) => {
                                    if (err) return res.json({ success: false, error: err });
                                    res.json({
                                        success: true,
                                        token: 'JWT ' + token,
                                        user: {
                                            id: user._id,
                                            logo: logo,
                                            photo: user.photo,
                                            user_info: user.user_info,
                                            username: user.username,
                                            email: user.email,
                                            special_permissions: user.special_permissions,
                                            companies_assigned: customer.companies_assigned,
                                            accounttype: user.accounttype,
                                            role: roledata,
                                        },
                                    });
                                });
                            });
                        } else {
                            Role.findOne({ role_name: customer.role }, (err, roledata) => {
                                if (err) return res.json({ success: false, error: err });
                                res.json({
                                    success: true,
                                    token: 'JWT ' + token,
                                    user: {
                                        id: user._id,
                                        logo: 'default-logo.png',
                                        photo: user.photo,
                                        user_info: user.user_info,
                                        username: user.username,
                                        email: user.email,
                                        special_permissions: user.special_permissions,
                                        companies_assigned: customer.companies_assigned,
                                        accounttype: user.accounttype,
                                        role: roledata,
                                    },
                                });
                            });
                        }
                    });
                }
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong password',
                });
            }
        });
    });
};

// inactivate users with ids
exports.user_inactivate = (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        User.findByIdAndUpdate(
            req.body[i], {
                $set: {
                    status: false,
                },
            },
            (err, user) => {
                if (err) return res.json({ success: false, error: err });
            }
        );
    }
    res.json({
        success: true,
        msg: 'Sucess!!',
    });
};

// activate users with ids
exports.user_activate = (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        User.findByIdAndUpdate(req.body[i], { $set: { status: true } }, (err, user) => {
            if (err) return res.json({ success: false, error: err });
        });
    }
    res.json({
        success: true,
        msg: 'Deactiaveted Successfully',
    });
};

// delete users with ids
exports.user_delete = (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        User.findById(req.body[i], (err, user) => {
            if (user.accounttype === 'staff') {
                Staff.findOneAndRemove({ username: user.username }, (err, remove) => {
                    if (err) return res.json({ success: false, msg: err });
                });
            }
            if (user.accounttype === 'customer') {
                Customer.findOneAndRemove({ username: user.username, }, (err, remove) => {
                    if (err) return res.json({ success: false, msg: err });
                });
            }
        });
        User.findByIdAndRemove(req.body[i], (err, user) => {
            if (err) return res.json({ success: false, error: err });
        });
    }
    res.json({
        success: true,
        msg: 'Deleted Successfully',
    });
};

// get staffs of customer user
exports.user_customer_staffs = (req, res) => {
    Store.find({ _id: { $in: req.body } }, (err, stores) => {
        if (err) return res.json({ success: false, msg: err });
        let staffs = [];
        for (let i = 0; i < stores.length; i++) {
            for (let j = 0; j < stores[i]['assigned_users'].length; j++) {
                staffs.push(stores[i]['assigned_users'][j]);
            }
        }
        staffs = Array.from(new Set(staffs));
        Staff.find({ _id: { $in: staffs } }, (error, staff_users) => {
            if (error) return res.json({ success: false, msg: error });
            const names = []; // Array of Staff Usernames
            for (let i = 0; i < staff_users.length; i++) {
                names.push(staff_users[i].username);
            }
            User.find({ username: { $in: names } }, (error_users, discovered_users) => {
                let respond_users = [];
                if (error_users) return res.json({ success: false, msg: error_users });
                for (let i = 0; i < discovered_users.length; i++) {
                    const user = {};
                    user['_id'] = discovered_users[i]['_id'];
                    user['username'] = discovered_users[i]['username'];
                    user['accounttype'] = 'staff';
                    user['status'] = discovered_users[i]['status'];
                    respond_users.push(user);
                }
                respond_users = sortByKey(respond_users, 'username');
                res.json(respond_users);
            });
        });
    });
};
// sort users ASC
function sortByKey(array, key) {
    return array.sort((a, b) => {
        const x = a[key].toUpperCase();
        const y = b[key].toUpperCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}