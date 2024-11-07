// Import the required modules
import mongoose, { Schema } from 'mongoose';

/**
 * Quiz Schema
 * This schema defines the structure of a quiz document in the database.
 * Fields:
 * - title: Title of the quiz (required)
 * - topic: Topic of the quiz (required)
 * - frequency: Frequency of the quiz (options: 'daily', 'weekly', 'monthly', default is 'weekly')
 * - questions: Array of question objects (each containing question text, options, and the correct answer)
 * - instructor: Reference to the instructor who created the quiz
 */
const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly',
    },
    questions: {
      type: [
        {
          questionText: { type: String, required: true },
          options: { type: [String], required: true }, // Array of strings for options
          correctAnswer: { type: String, required: true }, // The correct answer
        },
      ],
      default: [],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

// Create the Quiz model
const QuizModel = mongoose.model('Quiz', quizSchema);

// Export the Quiz model
export default QuizModel;
