// Import required modules
import { Router } from 'express';
// Import AI controller
import aiController from '../controllers/aiController.js';
// Import authorization middleware
import authorize from '../middlewares/authorize.js';

// Initialize router
const router = Router();

/**
 * AI-Related Routes
 * Endpoints for AI-based functionalities, restricted to specific roles.
 */

// Generate quiz questions (instructors and admins only)
router.post(
  '/generate-question',
  authorize('instructor', 'admin'),
  aiController.generateQuestion
);

// Retrieve related documents (accessible to students, instructors, and admins)
router.post(
  '/related-documents',
  authorize('student', 'instructor', 'admin'),
  aiController.relatedDocuments
);

// Generate a topic summary (accessible to students, instructors, and admins)
router.post(
  '/generate-summary',
  authorize('student', 'instructor', 'admin'),
  aiController.generateSummary
);

// Generate content/article (instructors and admins only)
router.post(
  '/generate-content',
  authorize('instructor', 'admin'),
  aiController.generateContent
);

export default router;
