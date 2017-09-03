const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const Company = require('../models/company');
const Customer = require('../models/customer');

/* Get All Companies  */
router.get('/', function(req, res, next) {
    Company.find(function(err, companies) {
        if (err) return res.send(err);
        res.json(companies);
    });
});

/* GET ALL COMPANIES AS Nested Tree */
router.get('/all', function(req, res, next) {
    Company.find({}).populate('child').exec()
        .catch(err => {
            return res.send('error');
        })
        .then(companies_obj => {
            Company.find({
                    $or: [{
                            parent: null
                        },
                        {
                            parent: ''
                        }
                    ]
                }).populate('child').exec()
                .catch(err => {
                    return res.send('error');
                })
                .then(parents => {
                    let companies = [];
                    companies_obj.forEach(company_obj => {
                        companies[company_obj._id] = company_obj;
                    });
                    let tree = [];
                    parents.forEach(parent => {
                        tree.push(build_tree(companies, parent));
                    });
                    res.json(tree);
                });
        });
});

router.post('/some', function(req, res, next) { // for companies screen when customer user logged in
    Company.find({}).populate('child').exec()
        .catch(err => {
            return res.send('error');
        })
        .then(companies_obj => {
            Company.find({ _id: { $in: req.body.ids } }).populate('child').exec()
                .catch(err => {
                    return res.send('error');
                })
                .then(parents => {
                    let companies = [];
                    companies_obj.forEach(company_obj => {
                        companies[company_obj._id] = company_obj;
                    });
                    let tree = [];
                    parents.forEach(parent => {
                        tree.push(build_tree(companies, parent));
                    });
                    res.json(tree);
                });
        });
});

router.post('/structure', function(req, res, next) { //for company structure in company create and edit screen
    Company.find({}).populate('child').exec()
        .catch(err => {
            return res.send('error');
        })
        .then(companies_obj => {
            Company.findById(req.body.id).populate('child').exec()
                .catch(err => {
                    return res.send('error');
                })
                .then(parent => {
                    let companies = [];
                    companies_obj.forEach(company_obj => {
                        companies[company_obj._id] = company_obj;
                    });
                    let tree = [];
                    tree.push(build_tree(companies, parent));
                    res.json(tree);
                });
        });
});

/* GET SINGLE COMPANY BY ID */
router.get('/:id', function(req, res, next) {
    Company.findById(req.params.id, function(err, company) {
        if (err) return next(err);
        res.json(company);
    });
});

// Get Companies with Ids
router.post('/ids', function(req, res, next) {
    Company.find({
        '_id': {
            $in: [req.body]
        }
    }, function(err, companies) {
        if (err) return next(err);
        res.json(companies);
    });
});

/* SAVE COMPANY */
router.post('/', function(req, res, next) {
    const parent = req.body.company.parent;
    const logo = req.body.company.logo;
    Company.create(req.body.company, function(err, company) {
        if (err) return res.json({
            success: false,
            error: err
        });
        if (parent) {
            Company.findById(parent, (error, parentCompany) => {
                if (error) res.json({
                    success: false,
                    msg: 'Something went wrong!'
                });
                if (parentCompany) {
                    if (!req.body.company.logo) {
                        company.logo = parentCompany.logo;
                        company.save();
                    }
                    parentCompany.child.push(company._id.toString());
                    parentCompany.save();
                    return res.json({
                        success: true,
                        msg: 'Success!',
                        company: company
                    });
                } else {
                    company.parent = '';
                    if (!req.body.company.logo) {
                        company.logo = 'default-logo.png';
                    }
                    company.save();
                    res.json({
                        success: true,
                        msg: 'Cannot find Parent Company'
                    });
                }
            });
        } else {
            if (!req.body.company.logo) {
                company.logo = 'default-logo.png';
            }
            company.save();
            return res.json({
                success: true,
                msg: 'Success!',
                company: company
            });
        }
    });
});

/* UPDATE COMPANY */
router.put('/:id', function(req, res, next) {
    if (req.body.company.parent !== '') {
        Company.findById(req.params.id, (err, company) => {
            if (err) return res.json({ success: false, msg: err });
            if (company.parent === req.body.company.parent) {
                updateCompany();
            } else {
                if (company.parent !== '') {
                    console.log('arrived here');
                    Company.findById(company.parent, (error, parent_company) => {
                        if (error) updateCompany();
                        if (parent_company) {
                            console.log('find parent');
                            for (let i = 0; i < parent_company.child.length; i++) {
                                if (parent_company.child[i] === req.params.id) {
                                    parent_company.child.splice(i, 1);
                                    parent_company.save((save_err, updated_parent) => {
                                        console.log('parent updated');
                                    });
                                }
                            }
                            updateCompany();
                        } else {
                            updateCompany();
                        }
                    });
                } else {
                    // console.log('arrived here');
                    updateCompany();
                }
            }
        });
    } else {
        Company.findById(req.params.id, (err, company) => {
            if (err) return res.json({ success: false, msg: err });
            if (company.parent !== '') {
                Company.findById(company.parent, (error, parent_company) => {
                    if (error) updateCompany();
                    if (parent_company) {
                        for (let i = 0; i < parent_company.child.length; i++) {
                            if (parent_company.child[i] === req.params.id) {
                                parent_company.child.splice(i, 1);
                                parent_company.save();
                            }
                        }
                        updateCompany();
                    } else {
                        updateCompany();
                    }
                });
            } else {
                updateCompany(); // after process part
            }
        });
    }

    function updateCompany() {
        if (req.body.company.parent) {
            Company.findByIdAndUpdate(req.params.id, req.body.company, (err, updated_company) => {
                if (err) return res.json({ success: false, msg: err });
                Company.findById(req.body.company.parent, (error, parent_company) => {
                    if (error) return res.json({ success: true, msg: 'cannot find parent company' });
                    if (parent_company) {
                        // console.log('existed parent');
                        var existed = false;
                        for (let i = 0; i < parent_company.child.length; i++) {
                            if (parent_company.child[i] === req.params.id) {
                                existed = true;
                            }
                        }
                        if (existed === false) {
                            parent_company.child.push(req.params.id);
                            parent_company.save((save_err, updated_parent) => {
                                if (save_err) return res.json({ success: true, msg: 'cannot update parent' });
                                return res.json({ success: true, msg: 'Success' });
                            });
                        } else {
                            return res.json({ success: true, msg: 'Success' });
                        }
                    } else {
                        return res.json({ success: true, msg: 'cannot find parent' });
                    }
                });
            });
        } else {
            Company.findByIdAndUpdate(req.params.id, req.body.company, (err, company) => {
                if (err) return res.json({ success: false, msg: err });
                return res.json({ success: true, msg: 'Success' });
            });
        }
    }
});

/* DELETE COMPANY */
router.delete('/:id', function(req, res, next) {
    // console.log(req.body);
    Company.findById(req.params.id, function(err, company) {
        if (err) return next(err);
        Coust
        res.json(company);
    });
});
router.post('/delete', (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        Company.find({ parent: req.body[i] }, (err, companies) => {
            if (err) return res.json({ success: false, msg: 'Error' });
            for (let j = 0; j < companies.length; j++) {
                companies[j].parent = '';
                companies[j].save();
            }
        });
    }
    for (let i = 0; i < req.body.length; i++) {
        Company.findByIdAndRemove(req.body[i], (err, company) => {
            if (err) {
                return next();
                next();
            }
            Customer.find({}, (error, customers) => {
                for (let i = 0; i < customers.length; i++) {
                    for (let j = 0; j < customers[i]['companies_assigned'].length; j++) {
                        if (customers[i]) {
                            if (customers[i]['companies_assigned'][j] === company._id) {
                                const index = customers[i]['companies_assigned'].indexOf(company._id);
                                customers[i]['companies_assigned'].splice(index, 1);
                                customers[i].save();
                            }
                        } else {
                            next();
                        }
                    }
                }
            });
        });
    }
    res.json({
        success: true,
        msg: 'Success!!'
    });
});

router.post('/deactivate', (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        Company.findByIdAndUpdate(
            req.body[i], {
                $set: {
                    status: false
                }
            },
            (err, company) => {
                if (err) throw err;
            });
    }
    res.json({
        success: true,
        msg: 'Success!!'
    });
});

// Get Childs Companies with id array
router.post('/childs', (req, res, next) => {
    let ids = req.body;
    let tasks = [];
    for (let i = 0; i < ids.length; i++) {
        tasks.push(getChilds(ids[i])); // Get Child Companies of each Company matched to id
    }
    childs = [];
    Promise.all(tasks)
        .then(data => {
            res.json(childs);
        })
        .catch(err => {
            console.log('Error: ', err);
        });
});

// get company's childs
var childs = [];

function getChilds(id) {
    return new Promise((resolve, reject) => {
        Company.findById(id, (err, company) => {
            if (err) {
                return reject(err);
            }
            if (company) {
                Company.findOne({
                    name: company.name
                }, (err, derived_company) => {
                    if (err) {
                        return reject(err);
                    }
                    if (derived_company.child.length) {
                        for (let i = 0; i < derived_company.child.length; i++) {
                            childs.push(derived_company.child[i]);
                        }
                        for (let i = 0; i < derived_company.child.length; i++) {
                            return resolve(getChilds(derived_company.child[i]));
                        }
                    } else {
                        return resolve();
                    }
                });
            } else {
                return reject('No user found');
            }
        });
    });
}
router.post('/reactivate', (req, res, next) => {
    for (let i = 0; i < req.body.length; i++) {
        Company.findByIdAndUpdate(
            req.body[i], {
                $set: {
                    status: true
                }
            },
            (err, company) => {
                if (err) throw err;
            }
        );
    }
    res.json({
        success: true,
        msg: 'Success!!'
    });
});

module.exports = router;

var build_tree = (companies, parent) => {
    let parent_data = {
        value: parent._id,
        text: parent.name,
        checked: false
    };

    // console.log('calling build tree for', parent.name);

    if (parent.child.length) {
        // console.log(parent.name + ' has ' + parent.child.length + ' children');

        parent_data.children = [];
        parent.child.forEach(child_obj => {
            // console.log('inside', parent.name, 'children', child_obj._id);
            let child = companies[child_obj._id];

            // console.log('digging into child ' + child.name);
            parent_data['collapsed'] = true;
            parent_data.children.push(build_tree(companies, child));
        });

        return parent_data;
    } else {
        // console.log(parent.name + ' has no children, returning it :', parent_data);

        return parent_data;
    }
};