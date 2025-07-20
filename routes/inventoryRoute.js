// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")



// Route to build inventory by classification view
// router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view
// router.get("/detail/:inventoryId", invController.buildByInventoryId);
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

// Route to trigger a server error
router.get("/error", utilities.handleErrors(invController.triggerError));


module.exports = router;