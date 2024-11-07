// Import essential modules and middleware
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

// Import API routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import instructorRoutes from './routes/instructorRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// Import middleware for authentication
import authenticate from './middlewares/authenticate.js';

// Initialize Express app
const app = express();

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true })); // Enable CORS with credentials

// Load and serve Swagger documentation
const swaggerDoc = JSON.parse(
  fs.readFileSync(path.resolve('src/swagger-output.json'), 'utf-8')
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Health check endpoint
app.get('/', (req, res) => {
  console.info('Health check endpoint accessed');
  res.status(200).json({ message: 'Welcome to the AI Tutor API!' });
});

// Route setup with authentication for secured routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', authenticate, userRoutes);
app.use('/api/v1/student', authenticate, studentRoutes);
app.use('/api/v1/instructor', authenticate, instructorRoutes);
app.use('/api/v1/admin', authenticate, adminRoutes);
app.use('/api/v1/ai', authenticate, aiRoutes);

// Export the configured app
export default app;
