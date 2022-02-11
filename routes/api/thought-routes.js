const {
  getAllThoughts,
  createThought,
  updateThought,
  getThoughtById,
  deleteThought
} = require('../../controllers/thought-controller')

const router = require('express').Router();

// Set up GET and POST routes
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought)

router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

module.exports = router