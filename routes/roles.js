const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config/database");
const Role = require("../models/role");

/* GET ALL ROLES */
router.get("/", function(req, res, next) {
  Role.find(function(err, roles) {
    if (err) return next(err);
    roles = sortByKey(roles, 'role_name');
    res.json(roles);
  });
});

/* GET SINGLE ROLE BY ID */
router.get("/:id", function(req, res, next) {
  Role.findById(req.params.id, function(err, role) {
    if (err) return next(err);
    res.json(role);
  });
});

/* SAVE Role */
router.post("/", function(req, res, next) {
  Role.create(req.body.role, function(err, role) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: 'Success!' });
  });
});

/* UPDATE Role */
router.put("/:id", function(req, res, next) {
  Role.findByIdAndUpdate(req.params.id, req.body.role, function(err, role) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: 'Success!' });
  });
});

/* DELETE Role */
router.delete("/:id", function(req, res, next) {
  Role.findByIdAndRemove(req.params.id, req.body, function(err, role) {
    if (err) return next(err);
    return res.json({ success: true, msg: 'Success!' });
  });
});

//DELETE ROLES

router.post("/delete", (req, res, next) => {
  for (let i = 0; i < req.body.roles.length; i++) {
    Role.findByIdAndRemove(req.body.roles[i], (err, role) => {
      if (err) console.error(err);
    });
  }
  res.json({
    success: true,
    msg: "Deleted Successfully"
  });
});

router.post("/deactivate", (req, res, next) => {
  for (let i = 0; i < req.body.length; i++) {
    Role.findByIdAndUpdate(
      req.body[i],
      {
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
});
router.post("/reactivate", (req, res, next) => {
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
});

  // sort users ASC
  function sortByKey(array, key) {
    return array.sort((a, b) => {
      const x = a[key].toUpperCase();
      const y = b[key].toUpperCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
  }
module.exports = router;
