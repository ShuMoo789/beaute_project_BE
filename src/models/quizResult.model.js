const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizResultSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  result: {
    type: Schema.Types.ObjectId,
    ref: "SkinType",
  },
  content: [{
    question: {
      type: String,
    },
    answer: {
      type: String,
    }
  }],
  points: {
    type: Number,
    required: true
  },
},
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('QuizResult', quizResultSchema);