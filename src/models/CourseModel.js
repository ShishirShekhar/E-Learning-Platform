// Import required modules
import mongoose, { Schema } from 'mongoose';

/**
 * Course Schema
 * This schema defines the structure of a course document in the database.
 * Fields:
 * - title: Title of the course (required)
 * - description: Description of the course (required)
 * - content: Array of strings for course materials/content (default is empty)
 * - instructor: Reference to the instructor who created the course (required)
 * - students: Array of references to users (students enrolled in the course)
 * - tests: Array of references to tests associated with the course
 */
const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: [String],
      default: [],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
      },
    ],
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

// Create the Course model
const CourseModel = mongoose.model('Course', courseSchema);

// Export the Course model
export default CourseModel;
