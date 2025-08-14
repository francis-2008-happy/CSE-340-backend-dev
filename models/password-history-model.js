const pool = require("../database/");

/* *****************************
*   Add password history
* *************************** */
async function addPasswordHistory(account_id, old_password) {
  try {
    const sql = "INSERT INTO password_history (account_id, old_password) VALUES ($1, $2) RETURNING *"
    const data = await pool.query(sql, [account_id, old_password])
    return data.rows[0]
  } catch (error) {
    console.error("addPasswordHistory error: " + error)
    return []
  }
}

/* *****************************
*   Get password history
* *************************** */
async function getPasswordHistory(account_id) {
  try {
    const sql = "SELECT * FROM password_history WHERE account_id = $1 ORDER BY password_change_date DESC"
    const data = await pool.query(sql, [account_id])
    return data.rows
  } catch (error) {
    console.error("getPasswordHistory error: " + error)
    return []
  }
}

module.exports = { addPasswordHistory, getPasswordHistory };