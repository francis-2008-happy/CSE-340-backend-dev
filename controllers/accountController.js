const utilities = require("../utilities/")
const accountController = {}


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
  })
}

module.exports = { buildLogin }



/* *****************************************
 * Deliver login view
 * ***************************************** */
accountController.buildLogin = async function (req, res, next) {
  let nav = await utilities.getNav(); // Assuming getNav is async and returns navigation data
  let messages = req.flash('notice'); // Get flash messages from connect-flash

  // Ensure messages is always an array
  // If req.flash returns a single string, convert it to an array with that string.
  // If req.flash returns undefined/null, set messages to an empty array.
  // if (!Array.isArray(messages)) {
  //   messages = messages ? [messages] : [];
  // }

  res.render("account/login", {
    title: "Login",
    nav, // Pass the navigation data
    messages // Pass the (now guaranteed) array of messages
  });
}

/* *****************************************
 * Deliver registration view
 * ***************************************** */
accountController.buildRegistration = async function (req, res, next) {
  let nav = await utilities.getNav(); // Assuming getNav is async
  let messages = req.flash('notice'); // Get flash messages

  // Ensure messages is always an array
  // if (!Array.isArray(messages)) {
  //   messages = messages ? [messages] : [];
  // }

  res.render("account/registration", {
    title: "Register",
    nav,
    messages
  });
}

// You will also need to add the accountLogin and registerAccount functions later
// For example:
accountController.accountLogin = async function (req, res, next) {
  // Placeholder for login logic
  req.flash("notice", "Login functionality is not yet implemented.");
  res.redirect("/account/login"); // Redirect back to login for now
}

accountController.registerAccount = async function (req, res, next) {
  // Placeholder for registration logic
  req.flash("notice", "Registration functionality is not yet implemented.");
  res.redirect("/account/register"); // Redirect back to register for now
}


module.exports = accountController;
































// controllers/accountController.js
// const accountController = {}

/* *****************************************
 * Deliver login view
 * ***************************************** */
// accountController.buildLogin = async function (req, res, next) {
//   res.render("account/login", {
//     title: "Login",
//     nav: await utilities.getNav(), 
//     messages: req.flash('notice') 
//   })
// }

/* *****************************************
 * Deliver registration view
 * ***************************************** */
// accountController.buildRegistration = async function (req, res, next) {
//   res.render("account/registration", {
//     title: "Register",
//     nav: await utilities.getNav(),
//     messages: req.flash('notice')
//   })
// }

// You'll also need a POST route handler for registration form submission later
// accountController.registerAccount = async function (req, res, next) { ... }

// module.exports = accountController;


/* ****************************************
*  Deliver registration view
* *************************************** */
// async function buildRegister(req, res, next) {
//   let nav = await utilities.getNav()
//   res.render("account/register", {
//     title: "Register",
//     nav,
//     errors: null
//   })
// }

// module.exports = { buildLogin, buildRegister }







