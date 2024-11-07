// Import Mongoose to connect to MongoDB
import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * This function attempts to connect to the database using the URI stored
 * in the environment variable `MONGO_URI`. It throws an error if the URI
 * is missing or the connection fails.
 *
 * @throws {Error} Throws an error if the MongoDB URI is not defined
 * or the connection fails.
 */
async function connectToDatabase() {
  try {
    // Get the MongoDB URI from environment variables
    const uri = process.env.MONGO_URI || '';

    // Ensure the URI is defined
    if (!uri) {
      throw new Error('MONGO_URI environment variable is not defined.');
    }

    // Options to configure the Mongoose connection (customizable as needed)
    const options = {
      // Mongoose 6 default options are sufficient for most cases
      // Additional options can be added here if necessary
    };

    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, options);
    console.log('Connected to MongoDB successfully.');
  } catch (error) {
    // Log the error and rethrow it to handle it further up the chain
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

// Export the function to connect to the database
export default connectToDatabase;
