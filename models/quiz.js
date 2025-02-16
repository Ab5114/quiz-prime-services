const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_By: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  questions: [
    {
      question_text: {
        type: String,
        required: true,
      },
      options: {
        type: [String], // Allows any number of options
        required: true,
      },
      correct_index: {
        type: Number,
        required: true,
        
      },
    },
  ],
});

const Quiz = mongoose.model("quiz", quizSchema);

module.exports = Quiz;
