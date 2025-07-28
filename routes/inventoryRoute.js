// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const validate = require('../utilities/inventory-validation')



// Route to build inventory by classification view
// router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view
// router.get("/detail/:inventoryId", invController.buildByInventoryId);
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

// Route to trigger a server error
router.get("/error", utilities.handleErrors(invController.triggerError));


// Route to build the inventory management view
router.get("/", utilities.handleErrors(invController.buildManagementView));



// Route to build the add-classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView));

// Route to process the new classification data
router.post(
  "/add-classification",
  validate.addClassificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);




// router.post(
//   "/add-classification",
//   validate.classificationRules(),
//   validate.checkClassificationData,
//   utilities.handleErrors(invController.addClassification)
// );

// Route to build the add-inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventoryView));

// Route to process the new inventory data
// Process the new inventory data
router.post(
  "/add-inventory",
  validate.addInventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);




// router.post(
//   "/add-inventory",
//   validate.inventoryRules(),
//   validate.checkInventoryData,
//   utilities.handleErrors(invController.addInventory)
// );

module.exports = router;