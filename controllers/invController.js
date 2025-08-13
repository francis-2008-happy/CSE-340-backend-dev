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



/* ***************************
 * Build inventory management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()


  // const classificationSelect = await utilities.buildClassificationList()
  //   res.render("./inventory/management", {
  //   title: "Inventory Management",
  //   nav,
  //   classificationSelect,
  //   errors: null,
  // });

  const classificationList = await utilities.buildClassificationList()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    classificationList,
    errors: null,
    messages: req.flash(),
  })
}

//   res.render("./inventory/management", {
//     title: "Vehicle Management",
//     nav,
//     errors: null,
//     messages: req.flash(),
//   })
// }


/* ***************************
 * Build add-classification view
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 * Process new classification
 * ************************** */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body

  const regResult = await invModel.addClassification(classification_name)

  if (regResult) {
    // Redirect to follow Post/Redirect/Get pattern
    req.flash("notice", `Congratulations, you have added ${classification_name} as a new classification.`)
    res.redirect("/inv/")
  } else {
    let nav = await utilities.getNav()
    req.flash("notice", "Sorry, adding the classification failed.")
    res.status(501).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    })
  }
}

/* ***************************
 * Build add-inventory view
 * ************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null,
  })
}

/* ***************************
 * Process new inventory
 * ************************** */
invCont.addInventory = async function (req, res) {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body;

  const regResult = await invModel.addInventory(
    inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
  );

  if (regResult) {
    let nav = await utilities.getNav();
    req.flash("notice", `Congratulations, you've added the ${inv_make} ${inv_model} to the inventory.`);
    res.redirect("/inv/");
  } else {
    let nav = await utilities.getNav();
    let classificationList = await utilities.buildClassificationList(classification_id);
    req.flash("notice", "Sorry, the new vehicle failed to add.");
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: null,
      // Pass back entered data for stickiness
      inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color,
    });
  }
};


/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData && invData.length > 0) {
    return res.json(invData)
  } else {
    // Return an empty array if no data is found so the client-side can handle it.
    return res.json([])
  }
}


/* ***************************
 * Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
    })
  }
}


// module.exports = invController;

module.exports = invCont