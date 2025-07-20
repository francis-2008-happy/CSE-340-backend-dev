const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  // Add a check to prevent a crash if a classification has no vehicles
  if (!data || data.length === 0) {
    const nav = await utilities.getNav()
    res.status(404).render("./errors/error", {
      title: "No Vehicles",
      message: "Sorry, we do not have any vehicles in that classification.",
      nav
    })
    return
  }
  
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid
  })
}


/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventoryById(inventory_id)
  let nav = await utilities.getNav()


  if (data) {
    const grid = await utilities.buildVehicleDetail(data)
    const vehicleName = `${data.inv_make} ${data.inv_model}`
    res.render("./inventory/detail", {
      title: vehicleName + " details",
      nav,
      grid,
    })
  } else {
    const err = new Error("Sorry, we couldn't find that vehicle.")
    err.status = 404
    next(err)
  }
}


/* ***************************
 *  Trigger an intentional error
 * ************************** */
invCont.triggerError = async function (req, res, next) {
  throw new Error("500 Internal Server Error - This is an intentional error.")
}


module.exports = invCont