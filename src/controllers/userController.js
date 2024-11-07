// Define the user controller object
const userController = {
  getUser: async (req, res) => {
    // Get a user
    try {
      /*
        #swagger.auto = false

        #swagger.path = '/user/me'
        #swagger.method = 'get'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.tags = ['User']
        #swagger.summary = 'Get user'
        #swagger.description = 'Endpoint to get user'
        #swagger.security = [{ bearerAuth: [] }]
      */
      const user = req.user;
      if (!user) {
        // #swagger.responses[404] = { description: 'User not found', schema: { data: null, error: 'User not found' } }
        res.status(404).json({ data: null, error: 'User not found' });
        return;
      }

      // #swagger.responses[200] = { description: 'User found', schema: { data: { _id: 'string', email: 'string', role: 'string' }, error: null } }
      res.status(200).json({
        data: { _id: user._id, email: user.email, role: user.role },
        error: null,
      });
      return;
    } catch (error) {
      console.error(
        'Error fetching user:',
        error instanceof Error ? error.message : error
      );
      // #swagger.responses[500] = { description: 'Internal Server Error', schema: { data: null, error: 'Internal Server Error' } }
      res.status(500).json({ data: null, error: 'Internal Server Error' });
      return;
    }
  },
};

// Export the user controller
export default userController;
