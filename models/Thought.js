const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);

thoughtSchema.virtuals('reactionCount').get(function () {
  return this.reactions.length;
});

const Student = model('student', thoughtSchema);

module.exports = Student;
