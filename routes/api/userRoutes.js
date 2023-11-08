const router = require('express').Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  addFriend,
  removeFriend,
  // deleteUser,
  //   getusers,
  //   getSingleuser,
  //   createuser,
  //   deleteuser,
  //   adduser,
  //   removeuser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser); //.delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
