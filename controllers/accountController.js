const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const accountController = {}

/* ****************************************
*  Deliver login view
* *************************************** */
accountController.buildLogin = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}

/* *****************************************
 * Deliver registration view
 * ***************************************** */
accountController.buildRegistration = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/registration", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
const { validationResult } = require("express-validator")

accountController.registerAccount = async function (req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render("account/registration", {
      errors,
      title: "Registration",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    })
    return
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/registration", {
      title: "Registration",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    })
  }
}

accountController.accountLogin = async function (req, res, next) {
  // Placeholder for login logic
  req.flash("notice", "Login functionality is not yet implemented.")
  res.redirect("/account/login") // Redirect back to login for now
}

module.exports = accountController;