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
router.get(
  "/",
  utilities.checkLogin,
  utilities.checkAuthorization,
  utilities.handleErrors(invController.buildManagementView)
);



// Route to build the add-classification view
router.get(
  "/add-classification",
  utilities.checkLogin,
  utilities.checkAuthorization,
  utilities.handleErrors(invController.buildAddClassificationView)
);

// Route to process the new classification data
router.post(
  "/add-classification",
  utilities.checkLogin,
  utilities.checkAuthorization,
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
router.get(
  "/add-inventory",
  utilities.checkLogin,
  utilities.checkAuthorization,
  utilities.handleErrors(invController.buildAddInventoryView)
);

// Route to process the new inventory data
// Process the new inventory data
router.post(
  "/add-inventory",
  utilities.checkLogin,
  utilities.checkAuthorization,
  validate.addInventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);


// A new route to get inventory items by classification_id
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));


// Route to build the edit inventory view
router.get(
  "/edit/:inv_id",
  utilities.checkLogin,
  utilities.checkAuthorization,
  utilities.handleErrors(invController.editInventoryView)
);

// Process the updated inventory data
router.post(
  "/update/",
  utilities.checkLogin,
  utilities.checkAuthorization,
  validate.addInventoryRules(),
  validate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);


module.exports = router;