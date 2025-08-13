const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
validate.addClassificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage("Please provide a valid classification name (alphanumeric characters only).")
      .custom(async (classification_name) => {
        const classificationExists = await invModel.checkExistingClassification(classification_name)
        if (classificationExists){
          throw new Error("Classification exists. Please use a different name.")
        }
      }),
  ]
}

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
validate.addInventoryRules = () => {
  return [
    // classification_id is required and must be a string
    body("classification_id")
      .trim()
      .notEmpty()
      .withMessage("Classification is required."),

    // inv_make is required and must be a string
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a make."),

    // inv_model is required and must be a string
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a model."),

    // inv_year is required and must be a 4-digit number
    body("inv_year")
      .trim()
      .isNumeric()
      .isLength({ min: 4, max: 4 })
      .withMessage("Please provide a valid 4-digit year."),

    // inv_description is required
    body("inv_description")
      .trim()
      .notEmpty()
      .withMessage("Please provide a description."),

    // inv_image is required
    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Please provide an image path."),

    // inv_thumbnail is required
    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Please provide a thumbnail path."),

    // inv_price is required and must be a number
    body("inv_price")
      .trim()
      .isNumeric()
      .withMessage("Please provide a valid price."),

    // inv_miles is required and must be a number
    body("inv_miles")
      .trim()
      .isNumeric()
      .withMessage("Please provide valid mileage."),

    // inv_color is required
    body("inv_color")
      .trim()
      .notEmpty()
      .withMessage("Please provide a color."),
  ]
}

/* ******************************
 * Check classification data and return errors or continue
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
      title: "Add New Vehicle",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    })
    return
  }
  next()
}

/* ******************************
 * Check data and return errors or continue to update
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    res.render("inventory/edit-inventory", {
      errors,
      title: "Edit " + itemName,
      nav,
      classificationSelect: classificationSelect,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    })
    return
  }
  next()
}

module.exports = validate

/* ******************************
 * Check data and return errors or continue to update
 * ***************************** */