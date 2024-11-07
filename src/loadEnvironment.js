// Import dotenv to manage environment variables
import dotenv from 'dotenv';

/**
 * Loads environment variables from the .env file into process.env.
 * Throws an error if the .env file cannot be loaded, aiding in debugging.
 *
 * This function must be called before accessing any environment-specific
 * configurations to ensure all variables are available.
 *
 * @function
 * @throws {Error} If loading the .env file fails, provides error details.
 */
const loadEnvironment = () => {
  dotenv.config();
};

// Export loadEnvironment for use in other modules
export default loadEnvironment;
