const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  //   getthoughts,
  //   getSinglethought,
  //   createthought,
  //   deletethought,
  //   addAssignment,
  //   removeAssignment,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts
// router.route('/').get(getUsers).post(createUser);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought); //.delete(deletethought);

// /api/thoughts/:thoughtId/assignments
// router.route('/:thoughtId/assignments').post(addAssignment);

// /api/thoughts/:thoughtId/assignments/:assignmentId
// router.route('/:thoughtId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
