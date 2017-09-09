const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const Company = require('../models/company');
const Customer = require('../models/customer');
const companyController = require('../controllers/companyController');

/* Get All Companies  */
router.get('/', companyController.company_list);

/* GET ALL COMPANIES AS Nested Tree */
router.get('/all',companyController.company_tree);

/* GET PART TREE WITH IDS */
router.post('/some', companyController.company_tree_part);

/* GET COMPANY STRUCTURE LIKE TREEVIEW */
router.post('/structure',companyController.company_structure);

/* GET SINGLE COMPANY BY ID */
router.get('/:id', companyController.company_detail);

// Get Companies with Ids
router.post('/ids', companyController.company_some);

/* SAVE COMPANY */
router.post('/', companyController.company_register);

/* UPDATE COMPANY */
router.put('/:id',companyController.company_update);

/* DELETE COMPANIES WITH IDS */
router.post('/delete', companyController.company_delete);

router.post('/deactivate', companyController.company_deactivate);

// Get Childs Companies with id array
router.post('/childs', companyController.company_childs);

router.post('/reactivate', companyController.company_reactivate);

module.exports = router;
