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
  questions: {
    type: [
      {
        question_text: {
          type: String,
          required: function () {
            return this.questions && this.questions.length > 0;
          },
          validate: {
            validator: function (value) {
              return value.trim().length > 0;  
            },
            message: "Question text cannot be empty.",
          },
        },
        options: {
          type: [String],
          required: true,
        },
        correct_index: {
          type: Number,
          required: true,
        },
      },
    ],

    default: [],
  },
});

const Quiz = mongoose.model("quiz", quizSchema);

module.exports = Quiz;
