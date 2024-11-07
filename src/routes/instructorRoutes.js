// Import the express router
import { Router } from 'express';
// Import the required controllers
import instructorController from '../controllers/instructorController.js';
// Import the required middlewares
import authorize from '../middlewares/authorize.js';

// Create a new router
const router = Router();

/**
 * Instructor Routes
 * These routes are dedicated to actions that instructors can perform, such as creating courses and tests.
 */

// Route to create a course (only accessible by instructors)
router.post(
  '/create-course',
  authorize('instructor'), // Authorization middleware to ensure only instructors can access this route
  instructorController.createCourse // Controller action to handle course creation
);

// Route to create a test with frequency (only accessible by instructors)
router.post(
  '/create-test',
  authorize('instructor'), // Authorization middleware to ensure only instructors can access this route
  instructorController.createTestWithFrequency // Controller action to handle test creation with frequency
);

// Export the router
export default router;
