const pool = require("../database/");

/* *****************************
*   Add a new review
* *************************** */
async function addReview(review_text, inv_id, account_id) {
  try {
    const sql = "INSERT INTO reviews (review_text, inv_id, account_id) VALUES ($1, $2, $3) RETURNING *"
    const data = await pool.query(sql, [review_text, inv_id, account_id])
    return data.rows[0]
  } catch (error) {
    console.error("addReview error: " + error)
    return error.message
  }
}

/* *****************************
*   Get all reviews for a specific vehicle
* *************************** */
async function getReviewsByInventoryId(inv_id) {
  try {
    const sql = "SELECT * FROM reviews WHERE inv_id = $1 ORDER BY review_date DESC"
    const data = await pool.query(sql, [inv_id])
    return data.rows
  } catch (error) {
    console.error("getReviewsByInventoryId error: " + error)
    return []
  }
}

/* *****************************
*   Get all reviews by a specific user
* *************************** */
async function getReviewsByAccountId(account_id) {
  try {
    const sql = "SELECT * FROM reviews WHERE account_id = $1 ORDER BY review_date DESC"
    const data = await pool.query(sql, [account_id])
    return data.rows
  } catch (error) {
    console.error("getReviewsByAccountId error: " + error)
    return []
  }
}

/* *****************************
*   Update a review
* *************************** */
async function updateReview(review_id, review_text) {
  try {
    const sql = "UPDATE reviews SET review_text = $1 WHERE review_id = $2 RETURNING *"
    const data = await pool.query(sql, [review_text, review_id])
    return data.rows[0]
  } catch (error) {
    console.error("updateReview error: " + error)
    return error.message
  }
}

/* *****************************
*   Delete a review
* *************************** */
async function deleteReview(review_id) {
  try {
    const sql = "DELETE FROM reviews WHERE review_id = $1"
    const data = await pool.query(sql, [review_id])
    return data
  } catch (error) {
    console.error("deleteReview error: " + error)
    return error.message
  }
}

module.exports = { addReview, getReviewsByInventoryId, getReviewsByAccountId, updateReview, deleteReview };