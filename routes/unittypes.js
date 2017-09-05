const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config/database");
const UnitType = require("../models/unittype");

/* GET ALL UNITTYPES */
router.get("/", function(req, res, next) {
  UnitType.find(function(err, unittypes) {
    if (err) return next(err);
    res.json(unittypes);
  });
});

/* GET SINGLE UNITTYPE BY ID */
router.get("/:id", function(req, res, next) {
  UnitType.findById(req.params.id, function(err, unittype) {
    if (err) return next(err);
    res.json(unittype);
  });
});

/* SAVE UNITTYPE */
router.post("/", function(req, res, next) {
  UnitType.create(req.body.unittype, function(err, unittype) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: 'Success!' });
  });
});

/* UPDATE UNITTYPE */
router.put("/:id", function(req, res, next) {
  UnitType.findByIdAndUpdate(req.params.id, req.body.unittype, function(err, unittype) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: 'Success!' });
  });
});

/* DELETE UNITTYPE */
router.delete("/:id", function(req, res, next) {
  UnitType.findByIdAndRemove(req.params.id, req.body, function(err, unittype) {
    if (err) return next(err);
    return res.json({ success: true, msg: 'Success!' });
  });
});

//DELETE UNITTYPES

router.post("/delete", (req, res, next) => {
  console.log(req.body.unittypes);
  for (let i = 0; i < req.body.unittypes.length; i++) {
    UnitType.findByIdAndRemove(req.body.unittypes[i], (err, unittype) => {
      if (err) console.error(err);
    });
  }
  res.json({
    success: true,
    msg: "Deleted Successfully"
  });
});

router.post("/deactivate", (req, res, next) => {
  for (let i = 0; i < req.body.unittypes.length; i++) {
    UnitType.findByIdAndUpdate( req.body.unittypes[i], { $set: { status: false }}, (err, unittype) => {
        if (err) throw err;
      });
  }
  res.json({
    success: true,
    msg: "Success!!"
  });
});
router.post("/reactivate", (req, res, next) => {
  for (let i = 0; i < req.body.unittypes.length; i++) {
    UnitType.findByIdAndUpdate( req.body.unittypes[i], { $set: { status: true }}, (err, unittype) => {
        if (err) throw err;
      }
    );
  }
  res.json({
    success: true,
    msg: "Success!!"
  });
});

module.exports = router;
