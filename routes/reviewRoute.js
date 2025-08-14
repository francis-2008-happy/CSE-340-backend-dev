// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const reviewController = require("../controllers/reviewController");

// Route to add a new review
router.post(
  "/add",
  utilities.checkLogin,
  utilities.handleErrors(reviewController.addReview)
);

module.exports = router;