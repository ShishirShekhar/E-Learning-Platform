// Import the express router
import { Router } from 'express';
// Import the required controllers
import studentController from '../controllers/studentController.js';
// Import the required middlewares
import authorize from '../middlewares/authorize.js';

// Create a new router
const router = Router();

/**
 * Student Routes
 * These routes are for student-specific actions such as enrolling in courses and viewing progress.
 */

// Route for enrolling in a course (only accessible by students)
router.post('/enroll', authorize('student'), studentController.enrollCourse);

// Route for viewing progress (only accessible by students)
router.get('/progress', authorize('student'), studentController.viewProgress);

// Export the router
export default router;
