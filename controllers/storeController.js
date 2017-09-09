const User = require('../models/user');
const Role = require('../models/role');
const Staff = require('../models/staff');
const Customer = require('../models/customer');
const Store = require('../models/stores');


exports.store_list = (req, res, next) => {
    Store.find({ store_type: { $nin: 'support_office' } }, function(err, stores) {
        if (err) return next(err);
        stores = sortByKey(stores, 'store_title');
        res.json(stores);
    });
};

exports.store_detail = (req, res, next) => {
    Store.findById(req.params.id, function(err, store) {
        if (err) return next(err);
        res.json(store);
    });
};


exports.store_support = (req, res, next) => {
    Store.findOne({ store_type: 'support_office' }, (err, office) => {
        if (err) return res.json({ success: false, msg: err });
        res.json(office);
    });
};

exports.store_register = (req, res, next) => {
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
};

exports.store_update = (req, res, next) => {
    Store.findByIdAndUpdate(req.params.id, req.body, function(err, store) {
        if (err) return next(err);
        res.json({ success: true, msg: 'Success!' })
    });
};

exports.store_delete = (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        Store.findByIdAndRemove(req.body[i], (err, store) => {
            if (err) return res.json({ success: false, msg: 'Cannot find store' });
            res.json({
                success: true,
                msg: "Deleted Successfully"
            });
        });
    }
};

exports.store_reactivate = (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        Store.findByIdAndUpdate(req.body[i], { $set: { status: true } }, (err, user) => {
            if (err) throw err;
            res.json({
                success: true,
                msg: "Success!!"
            });
        });
    }
};

exports.store_deactivate = (req, res, next) => {
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
};

// sort users ASC
function sortByKey(array, key) {
    return array.sort((a, b) => {
        const x = a[key].toUpperCase();
        const y = b[key].toUpperCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}