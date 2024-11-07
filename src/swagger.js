// Import swagger-autogen for auto-generating Swagger documentation
import swaggerAutogen from 'swagger-autogen';

// Swagger configuration options
const options = {
  openapi: '3.0.0',
  language: 'en-US',
  disableLogs: false,
  autoHeaders: true,
  autoQuery: true,
  autoBody: true,
  writeOutputFile: true,
};

// API documentation structure
const doc = {
  info: {
    title: 'AI Tutor API',
    description: `API for AI Tutor, managing students, courses, and AI-generated questions. For more details, visit the [GitHub repository](https://github.com/ShishirShekhar/E-Learning-Platform.git).`,
    version: '1.0.0',
    contact: {
      name: 'Shishir Shekhar',
      email: 'sspdav02@gmail.com',
    },
    termOfService: 'https://www.google.com',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host: 'localhost:8000',
  basePath: '/api/v1',
  schemes: ['https', 'http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Local server',
    },
  ],
  tags: [
    { name: 'Auth', description: 'User authentication endpoints' },
    { name: 'User', description: 'User management endpoints' },
    { name: 'Student', description: 'Student management endpoints' },
    { name: 'Instructor', description: 'Instructor management endpoints' },
    { name: 'Admin', description: 'Admin management endpoints' },
    { name: 'AI', description: 'AI model management endpoints' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  externalDocs: {
    description: 'GitHub Repository',
    url: 'https://github.com/ShishirShekhar/E-Learning-Platform.git',
  },
};

// Define output file and routes
const outputFile = './swagger-output.json';
const routes = ['./app.js'];

// Generate Swagger documentation
swaggerAutogen(options)(outputFile, routes, doc);
