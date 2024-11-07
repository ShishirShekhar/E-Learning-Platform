// Import the express router
import { Router } from 'express';
// Import Auth Controller
import authController from '../controllers/authController.js';
// Import the authenticate middleware
import authenticate from '../middlewares/authenticate.js';

// Create a new router
const router = Router();

/**
 * Authentication Routes
 * These routes handle user authentication (signup, login, and logout).
 */

// User signup
router.post('/signup', authController.userSignup);
// User login
router.post('/login', authController.userLogin);
// User logout (requires authentication)
router.post('/logout', authenticate, authController.userLogout);

// Export the router
export default router;
