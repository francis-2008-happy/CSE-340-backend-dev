// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/") // Assuming utilities/index.js (or just utilities.js)
const accountController = require("../controllers/accountController") // This will be created later

// Route to build the account management view
// This route will be triggered when the "My Account" link is clicked
// The full path will be something like "/account/" (configured in server.js)
router.get("/", utilities.handleErrors(accountController.buildAccountManagement));

module.exports = router;