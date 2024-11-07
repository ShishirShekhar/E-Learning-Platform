/**
 * Middleware to authorize access based on user roles.
 * This checks if the user has the required role to access a specific route.
 *
 * @param {...string} allowedRoles - The list of roles allowed to access the route.
 * @returns {Function} - Middleware function to handle the role-based authorization.
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Ensure the user is authenticated and has a valid role
      if (!req.user || !req.user.role) {
        return res
          .status(401)
          .json({ error: 'Unauthorized: User not authenticated.' });
      }

      const userRole = req.user.role;

      // If the user's role is not in allowed roles and they are not an admin, deny access
      if (!allowedRoles.includes(userRole) && userRole !== 'admin') {
        return res.status(403).json({
          error:
            'Forbidden: You do not have permission to access this resource.',
        });
      }

      // If authorized, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res
        .status(500)
        .json({ error: 'Internal Server Error: Authorization error.' });
    }
  };
};

export default authorize;
