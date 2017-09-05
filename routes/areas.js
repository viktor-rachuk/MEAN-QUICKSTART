const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config/database");
const Area = require("../models/area");

/* GET ALL AREAS */
router.get("/", function(req, res, next) {
  Area.find(function(err, areas) {
    if (err) return next(err);
    res.json(areas);
  });
});

/* GET SINGLE AREA BY ID */
router.get("/:id", function(req, res, next) {
  Area.findById(req.params.id, function(err, area) {
    if (err) return next(err);
    res.json(area);
  });
});

/* SAVE AREA */
router.post("/", function(req, res, next) {
  Area.create(req.body.area, function(err, area) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: 'Success!' });
  });
});

/* UPDATE AREA */
router.put("/:id", function(req, res, next) {
  Area.findByIdAndUpdate(req.params.id, req.body.area, function(err, area) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: 'Success!' });
  });
});

/* DELETE AREA */
router.delete("/:id", function(req, res, next) {
  Area.findByIdAndRemove(req.params.id, req.body, function(err, area) {
    if (err) return next(err);
    return res.json({ success: true, msg: 'Success!' });
  });
});

//DELETE ROLES

router.post("/delete", (req, res, next) => {
  for (let i = 0; i < req.body.areas.length; i++) {
    Area.findByIdAndRemove(req.body.areas[i], (err, area) => {
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
    Area.findByIdAndUpdate( req.body[i], { $set: { status: false }}, (err, area) => {
        if (err) throw err;
      });
  }
  res.json({
    success: true,
    msg: "Success!!"
  });
});
router.post("/reactivate", (req, res, next) => {
  for (let i = 0; i < req.body.length; i++) {
    Area.findByIdAndUpdate( req.body[i], { $set: { status: true }}, (err, area) => {
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
