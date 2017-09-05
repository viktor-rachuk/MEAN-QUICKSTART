const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Role = require('../models/role');
const Staff = require('../models/staff');
const Customer = require('../models/customer');
const Store = require('../models/stores');
const mongoose = require('mongoose');

/* GET ALL STORES */
router.get('/', function(req, res, next) {
    Store.find({store_type: {$nin: 'support_office'}},function(err, stores) {
        if (err) return next(err);
        res.json(stores);
    });
});

/* GET SINGLE STORE BY ID */
router.get('/:id', function(req, res, next) {
    Store.findById(req.params.id, function(err, store) {
        if (err) return next(err);
        res.json(store);
    });
});

/* Get SupporOffice Details */
router.post('/support', function(req, res, next) {
    Store.findOne({store_type: 'support_office'}, (err, office) => {
        if (err) return res.json({success: false, msg: err});
        res.json(office);
    });
})
/* SAVE STORE */
router.post('/', function(req, res, next) {
    let newStore = new Store({
        store_info: req.body.store_info,
        store_title: req.body.store_title,
        store_type: req.body.store_type,
        email: req.body.email,
        parent: req.body.parent,
        child: req.body.child,
        key_contact: req.body.key_contact,
        status: req.body.status,
        account_info: req.body.account_info
    });

    newStore.save(function(err, store) {
        if (err) return res.json({ success: false, error: err });
        if (store.parent) {
            Store.findById(store.parent, (err, parentStore) => {
                if (err) return res.json({ success: false, error: err });
                if (parentStore) {
                    let child = parentStore.child;
                    child.push(store._id.toString());
                    parentStore.child = child;
                    parentStore.save(function(error, parent) {
                        if (err) return res.json({ success: false, error: err });
                        res.json({ success: true, msg: 'Success!!!' });
                    });
                } else {
                    if (err) return res.json({ success: false, msg: 'Cannot found parent' });
                }
            });
        } else {
            return res.json({ success: true, msg: 'Success!' });
        }
    });
});

/* UPDATE STORE */
router.put('/:id', function(req, res, next) {
    Store.findByIdAndUpdate(req.params.id, req.body, function(err, store) {
        if (err) return next(err);
        res.json({ success: true, msg: 'Success!' })
    });
});

/* DELETE STORE */
router.delete('/:id', function(req, res, next) {
    Store.findByIdAndRemove(req.params.id, req.body, function(err, store) {
        if (err) return next(err);
        res.json({ success: true, msg: 'Success!' })
    });
});


/* DELETE STORES */

router.post('/delete', (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        Store.findByIdAndRemove(req.body[i], (err, store) => {
            if (err) return res.json({ success: false, msg: 'Cannot find store' });
            res.json({
                success: true,
                msg: "Deleted Successfully"
            });
        });
    }
});

router.post("/reactivate", (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        Store.findByIdAndUpdate(req.body[i], { $set: { status: true } }, (err, user) => {
            if (err) throw err;
            res.json({
                success: true,
                msg: "Success!!"
            });
        });
    }
});

router.post("/deactivate", (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        Store.findByIdAndUpdate(
            req.body[i], { $set: { status: false } }, (err, user) => {
                if (err) throw err;
                res.json({
                    success: true,
                    msg: "Sucess!!"
                });
            }
        );
    }
});

module.exports = router;