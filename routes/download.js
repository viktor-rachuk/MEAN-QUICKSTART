
const express = require("express");
const router = express.Router();
const downloadController = require('../controllers/downloadController');
router.get('/order', downloadController.download_order);
router.get('/remittance', downloadController.download_remittance);
module.exports = router;