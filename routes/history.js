const express = require("express");
const router = express.Router();
const History = require("../models/history");
const historyController = require('../controllers/historyController');
/* GET ALL HISTORIES */
router.get('/', historyController.history_list);

module.exports = router;
