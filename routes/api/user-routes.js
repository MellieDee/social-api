const {
  getAllUsers,
  createUser,
  getUserByID,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller')

const router = require('express').Router();




// Set Up GET ALL and  POST routes at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser)


// Set up by ID Routes - GET ONE, PUT, DELETE
router
  .route('/:id')
  .get(getUserByID)
  .put(updateUser)
  .delete(deleteUser)


// // Set up Friend Routes - POST & DELETE
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend)



module.exports = router