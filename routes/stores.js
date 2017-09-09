const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

/* GET ALL STORES */
router.get('/', storeController.store_list);

/* GET SINGLE STORE BY ID */
router.get('/:id', storeController.store_detail);

/* Get SupporOffice Details */
router.post('/support', storeController.store_support)
/* SAVE STORE */
router.post('/', storeController.store_register);

/* UPDATE STORE */
router.put('/:id', storeController.store_update);

/* DELETE STORES */
router.post('/delete', storeController.store_delete);

/* REACTIVATE STORES */
router.post("/reactivate", storeController.store_reactivate);

/* DEACTIVATE STORES */
router.post("/deactivate", storeController.store_deactivate);

module.exports = router;