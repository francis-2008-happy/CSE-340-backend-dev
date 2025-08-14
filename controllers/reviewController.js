const reviewModel = require("../models/review-model");
const utilities = require("../utilities/");

/* ****************************************
 *  Add a new review
 * ************************************ */
async function addReview(req, res, next) {
  const { review_text, inv_id } = req.body;
  const account_id = res.locals.accountData.account_id;

  const reviewResult = await reviewModel.addReview(
    review_text,
    inv_id,
    account_id
  );

  if (reviewResult) {
    req.flash("notice", "Your review has been added.");
    res.redirect(`/inv/detail/${inv_id}`);
  } else {
    req.flash("notice", "Sorry, there was an error adding your review.");
    res.redirect(`/inv/detail/${inv_id}`);
  }
}

module.exports = { addReview };