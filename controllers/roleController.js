const Role = require("../models/role");

exports.role_list = (req, res, next) => {
    Role.find(function(err, roles) {
        if (err) return next(err);
        roles = sortByKey(roles, 'role_name');
        res.json(roles);
    });
};

exports.role_detail = (req, res, next) => {
    Role.findById(req.params.id, function(err, role) {
        if (err) return next(err);
        res.json(role);
    });
};

exports.role_register = (req, res, next) => {
    Role.create(req.body.role, function(err, role) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, msg: 'Success!' });
    });
};

exports.role_update = (req, res, next) => {
    Role.findByIdAndUpdate(req.params.id, req.body.role, function(err, role) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, msg: 'Success!' });
    });
};

exports.role_delete = (req, res, next) => {
    for (let i = 0; i < req.body.roles.length; i++) {
        Role.findByIdAndRemove(req.body.roles[i], (err, role) => {
            if (err) console.error(err);
        });
    }
    res.json({
        success: true,
        msg: "Deleted Successfully"
    });
};


exports.role_deactivate = (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        Role.findByIdAndUpdate(
            req.body[i], {
                $set: {
                    status: false,
                },
            },
            (err, user) => {
                if (err) throw err;
            }
        );
    }
    res.json({
        success: true,
        msg: "Success!!"
    });
};

exports.role_reactivate = (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        Role.findByIdAndUpdate(
            req.body[i], {
                $set: {
                    status: true
                }
            },
            (err, user) => {
                if (err) throw err;
            }
        );
    }
    res.json({
        success: true,
        msg: "Success!!"
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