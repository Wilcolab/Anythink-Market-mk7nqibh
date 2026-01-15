/**
 * Comments API Router
 * 
 * Provides endpoints for managing comments in the Anythink Market application.
 * 
 * @module routes/api/comments
 * @requires express
 * @requires mongoose
 */

/**
 * GET /api/comments
 * Retrieves all comments from the database.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} JSON array of all comments
 * @throws {Error} Passes errors to error handling middleware
 */

/**
 * DELETE /api/comments/:id
 * Deletes a comment by its ID.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The comment ID to delete
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} JSON object with success message or 404 error
 * @throws {Error} Passes errors to error handling middleware
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

//add another endpoint for deleting a comment by its ID
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
});
