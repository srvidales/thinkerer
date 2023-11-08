// const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// Aggregate function to get the number of thoughts overall
// const headCount = async () => {
//   const numberOfthoughts = await thought.aggregate().count('thoughtCount');
//   return numberOfthoughts;
// };

// Aggregate function for getting the overall grade using $avg
// const grade = async (thoughtId) =>
//   thought.aggregate([
//     // only include the given thought by using $match
//     { $match: { _id: new ObjectId(thoughtId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: new ObjectId(thoughtId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  // Get all users
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {
        thoughts,
        // headCount: await headCount(),
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({
        thought,
        // grade: await grade(req.params.thoughtId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOne({ _id: req.body.userId });
      user.thoughts.push(thought._id);
      user.save();

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought and remove it from the user
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      const user = await User.findOneAndUpdate(
        { _id: thought.userId },
        { $pull: { thoughts: req.params.thoughtId } },
        { runValidators: true, new: true },
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //   // Add an assignment to a thought
  //   async addAssignment(req, res) {
  //     console.log('You are adding an assignment');
  //     console.log(req.body);

  //     try {
  //       const thought = await thought.findOneAndUpdate(
  //         { _id: req.params.thoughtId },
  //         { $addToSet: { assignments: req.body } },
  //         { runValidators: true, new: true }
  //       );

  //       if (!thought) {
  //         return res
  //           .status(404)
  //           .json({ message: 'No thought found with that ID :(' });
  //       }

  //       res.json(thought);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   },
  //   // Remove assignment from a thought
  //   async removeAssignment(req, res) {
  //     try {
  //       const thought = await thought.findOneAndUpdate(
  //         { _id: req.params.thoughtId },
  //         { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //         { runValidators: true, new: true }
  //       );

  //       if (!thought) {
  //         return res
  //           .status(404)
  //           .json({ message: 'No thought found with that ID :(' });
  //       }

  //       res.json(thought);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   },
};
