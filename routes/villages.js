const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config/database");
const Village = require("../models/village");

/* GET ALL VILLAGES */
router.get("/", function(req, res, next) {
  Village.find(function(err, villages) {
    if (err) return next(err);
    res.json(villages);
  });
});

/* GET SINGLE VILLAGE BY ID */
router.get("/:id", function(req, res, next) {
  Village.findById(req.params.id, function(err, village) {
    if (err) return next(err);
    res.json(village);
  });
});

/* SAVE VILLAGE */
router.post("/", function(req, res, next) {
  Village.create(req.body.village, function(err, village) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: 'Success!' });
  });
});

/* UPDATE VILLAGE */
router.put("/:id", function(req, res, next) {
  Village.findByIdAndUpdate(req.params.id, req.body.village, function(err, village) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: 'Success!' });
  });
});

/* DELETE VILLAGE */
router.delete("/:id", function(req, res, next) {
  Village.findByIdAndRemove(req.params.id, req.body, function(err, village) {
    if (err) return next(err);
    return res.json({ success: true, msg: 'Success!' });
  });
});

//DELETE VILLAGES

router.post("/delete", (req, res, next) => {
  for (let i = 0; i < req.body.villages.length; i++) {
    Village.findByIdAndRemove(req.body.villages[i], (err, village) => {
      if (err)console.error(err);
    });
  }
  res.json({
    success: true,
    msg: "Deleted Successfully"
  });
});

router.post("/deactivate", (req, res, next) => {
  for (let i = 0; i < req.body.length; i++) {
    Village.findByIdAndUpdate( req.body[i], { $set: { status: false }}, (err, village) => {
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
    Village.findByIdAndUpdate( req.body[i], { $set: { status: true }}, (err, village) => {
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
