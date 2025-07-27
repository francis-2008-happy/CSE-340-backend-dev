// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/") 
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")

// Route to build the account management view
// This route will be triggered when the "My Account" link is clicked
// The full path will be something like "/account/" (configured in server.js)
router.get("/", utilities.handleErrors(accountController.buildAccountManagement));

// Route to build the login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// routes/accountRoute.js (add this)
// Route to process the login attempt
router.post("/login", utilities.handleErrors(accountController.accountLogin)); 


// NEW: Route to build the registration view
router.get("/register", utilities.handleErrors(accountController.buildRegistration));


// Route to process the registration attempt (you'll create registerAccount in the controller)
router.post("/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;