const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config/database");
const Colour = require("../models/colour");

/* GET ALL COLOURS */
router.get("/", function(req, res, next) {
  Colour.find(function(err, colours) {
    if (err) return next(err);
    res.json(colours);
  });
});

/* GET SINGLE COLOUR BY ID */
router.get("/:id", function(req, res, next) {
  Colour.findById(req.params.id, function(err, colour) {
    if (err) return next(err);
    res.json(colour);
  });
});

/* SAVE COLOUR */
router.post("/", function(req, res, next) {
  console.log(req.body.col);
  Colour.create(req.body.col, function(err, colour) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: 'Success!' });
  });
});

/* UPDATE COLOUR */
router.put("/:id", function(req, res, next) {
  Colour.findByIdAndUpdate(req.params.id, req.body.col, function(err, colour) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, msg: 'Success!' });
  });
});

/* DELETE COLOUR */
router.delete("/:id", function(req, res, next) {
  Colour.findByIdAndRemove(req.params.id, req.body, function(err, colour) {
    if (err) return next(err);
    return res.json({ success: true, msg: 'Success!' });
  });
});

//DELETE COLOURS

router.post("/delete", (req, res, next) => {
  for (let i = 0; i < req.body.cols.length; i++) {
    Colour.findByIdAndRemove(req.body.cols[i], (err, colour) => {
      if (err) console.error(err);
    });
  }
  res.json({
    success: true,
    msg: "Deleted Successfully"
  });
});

router.post("/deactivate", (req, res, next) => {
  for (let i = 0; i < req.body.cols.length; i++) {
    Colour.findByIdAndUpdate( req.body.cols[i], { $set: { status: false }}, (err, colour) => {
        if (err) throw err;
      });
  }
  res.json({
    success: true,
    msg: "Success!!"
  });
});
router.post("/reactivate", (req, res, next) => {
  for (let i = 0; i < req.body.cols.length; i++) {
    Colour.findByIdAndUpdate( req.body.cols[i], { $set: { status: true }}, (err, colour) => {
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
