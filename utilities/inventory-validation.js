const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/* **********************************
 * Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    // classification_name is required and must be string
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .isAlpha()
      .withMessage("Classification name does not meet requirements. Please use alphabetic characters only."),
  ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}


/* **********************************
 * Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
  return [
    // Add rules for each form field here. Examples:
    body("inv_make").trim().isLength({ min: 3 }).withMessage("Please provide a valid make."),
    body("inv_model").trim().isLength({ min: 3 }).withMessage("Please provide a valid model."),
    body("inv_year").trim().isNumeric({ no_symbols: true }).isLength({ min: 4, max: 4 }).withMessage("Please provide a valid 4-digit year."),
    body("inv_price").trim().isNumeric({ no_symbols: true }).withMessage("Please provide a valid price (digits only)."),
    // ... and so on for all other fields
  ]
}

/* ******************************
 * Check inventory data and return errors or continue
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationList = await utilities.buildClassificationList(classification_id)
        res.render("inventory/add-inventory", {
            errors,
            title: "Add Inventory",
            nav,
            classificationList,
            inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color,
        })
        return
    }
    next()
}

module.exports = validate