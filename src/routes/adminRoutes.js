// Import required modules
import { Router } from 'express';
// Import admin controller
import adminController from '../controllers/adminController.js';
// Import authorization middleware
import authorize from '../middlewares/authorize.js';

// Initialize the router
const router = Router();

/**
 * Admin Routes
 * Routes for managing users and courses, restricted to admin roles
 */
router.get('/users', authorize('admin'), adminController.getAllUsers); // Get all users
router.delete('/user/:id', authorize('admin'), adminController.deleteUser); // Delete specific user
router.get('/courses', authorize('admin'), adminController.getAllCourses); // Get all courses
router.delete('/course/:id', authorize('admin'), adminController.deleteCourse); // Delete specific course

// Export the router
export default router;
