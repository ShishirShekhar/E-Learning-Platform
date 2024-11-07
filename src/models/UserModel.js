// Import the required modules
import mongoose, { Schema } from 'mongoose';

/**
 * User Schema
 * This schema defines the structure of a user document in the database.
 * Fields:
 * - name: User's full name (required)
 * - email: User's email (unique and required)
 * - password: User's password (required)
 * - role: User's role (default: 'student'; options: 'student', 'instructor', 'admin')
 * - courses: List of course IDs the user is enrolled in (references the 'Course' model)
 */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

// Create the User model from the schema
const UserModel = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
export default UserModel;
