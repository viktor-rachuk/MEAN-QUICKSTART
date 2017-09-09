const express = require("express");
const router = express.Router();
const Role = require("../models/role");
const roleController = require('../controllers/roleController');
/* GET ALL ROLES */
router.get("/", roleController.role_list);

/* GET SINGLE ROLE BY ID */
router.get("/:id", roleController.role_detail);

/* SAVE Role */
router.post("/", roleController.role_register);

/* UPDATE Role */
router.put("/:id", roleController.role_update);

//DELETE ROLES
router.post("/delete", roleController.role_delete);

router.post("/deactivate", roleController.role_deactivate);

router.post("/reactivate", roleController.role_reactivate);

module.exports = router;
