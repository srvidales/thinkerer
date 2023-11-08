// const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

// Aggregate function to get the number of users overall
// const headCount = async () => {
//   const numberOfusers = await user.aggregate().count('userCount');
//   return numberOfusers;
// };

// Aggregate function for getting the overall grade using $avg
// const grade = async (userId) =>
//   user.aggregate([
//     // only include the given user by using $match
//     { $match: { _id: new ObjectId(userId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: new ObjectId(userId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        // headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //   // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      }).select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({
        user,
        // grade: await grade(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   // Delete a user and remove them from the course
  //   async deleteuser(req, res) {
  //     try {
  //       const user = await user.findOneAndRemove({ _id: req.params.userId });

  //       if (!user) {
  //         return res.status(404).json({ message: 'No such user exists' });
  //       }

  //       const course = await Course.findOneAndUpdate(
  //         { users: req.params.userId },
  //         { $pull: { users: req.params.userId } },
  //         { new: true }
  //       );

  //       if (!course) {
  //         return res.status(404).json({
  //           message: 'user deleted, but no courses found',
  //         });
  //       }

  //       res.json({ message: 'user successfully deleted' });
  //     } catch (err) {
  //       console.log(err);
  //       res.status(500).json(err);
  //     }
  //   },

  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true },
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true },
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
