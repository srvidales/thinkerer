const router = require('express').Router();
const {
  getThoughts,
  createThought,
  //   getStudents,
  //   getSingleStudent,
  //   createStudent,
  //   deleteStudent,
  //   addAssignment,
  //   removeAssignment,
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users
// router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
