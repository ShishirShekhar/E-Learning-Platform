// Import environment variable loader and load them immediately
import loadEnvironment from './src/loadEnvironment.js';
// Import database connection setup
import connectToDatabase from './src/config/database.js';

// Import application instance
import app from './src/app.js';

/**
 * Starts the server, initializes the database connection, and listens for shutdown signals.
 * @async
 * @function startServer
 * @returns {Promise<void>} Starts the server on the specified port.
 * @throws {Error} If there is an error connecting to the database or starting the server.
 */
async function startServer() {
  try {
    // Load environment variables
    loadEnvironment();

    // Establish a database connection
    await connectToDatabase();

    // Define the port for the server
    const port = process.env.PORT || 8000;

    // Start the server on the specified port and log a success message
    const server = app.listen(port, () => {
      console.info(`Server is successfully running on port ${port}`);
    });

    // Set up graceful shutdown on SIGINT and SIGTERM signals
    process.on('SIGINT', () => server.close(() => process.exit(0)));
    process.on('SIGTERM', () => server.close(() => process.exit(0)));
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit the process with a failure status
  }
}

// Execute the server start function
startServer();

// Export the app instance for external modules
export default app;
