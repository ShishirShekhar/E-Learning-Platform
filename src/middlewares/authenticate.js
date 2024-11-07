import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

/**
 * Middleware to authenticate a user based on the JWT token.
 * The token can be passed either in the cookies or in the Authorization header.
 *
 * @param {Object} req - The request object containing cookies or headers.
 * @param {Object} res - The response object for sending the result.
 * @param {Function} next - The next middleware function to call.
 */
export default async function authenticate(req, res, next) {
  // Extract token from cookies or Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  // If no token is found, send an unauthorized error
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Token not found.' });
  }

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user based on the decoded token's user ID
    const user = await User.findById(decoded._id);

    // If the user is not found, send an unauthorized error
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    // Attach the user to the request object for further use
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handle any errors related to token verification or database queries
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
  }
}
