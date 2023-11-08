const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  deleteThought,
  updateThought,
  //   getthoughts,
  //   getSinglethought,
  //   createthought,
  //   deletethought,
  //   addAssignment,
  //   removeAssignment,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/assignments
// router.route('/:thoughtId/assignments').post(addAssignment);

// /api/thoughts/:thoughtId/assignments/:assignmentId
// router.route('/:thoughtId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
