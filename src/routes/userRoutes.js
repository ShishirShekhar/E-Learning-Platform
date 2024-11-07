// Import the modules
import { Router } from 'express';
// Import the required controllers
import userController from '../controllers/userController.js';

// Create a new router
const router = Router();

/**
 * User Routes
 * These routes handle user-specific actions such as retrieving user information.
 */

// Route for fetching user information (accessible by authenticated users)
router.get('/me', userController.getUser);

// Export the router
export default router;
