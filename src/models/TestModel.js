// Import the required modules
import mongoose, { Schema } from 'mongoose';

/**
 * Test Schema
 * This schema defines the structure of a test document in the database.
 * Fields:
 * - topic: Topic of the test (required)
 * - frequency: Frequency of the test (options: 'daily', 'weekly', 'monthly', required)
 * - questions: Array of strings representing the test questions (optional)
 * - course: Reference to the course associated with the test (required)
 */
const testSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: true,
    },
    questions: {
      type: [String], // Array of strings for questions
      default: [], // Optional: Define a default value
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

// Create the Test model using the schema
const TestModel = mongoose.model('Test', testSchema);

// Export the Test model for use in other parts of the application
export default TestModel;
