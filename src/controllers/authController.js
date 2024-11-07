// Import the required modules
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Import the User model
import User from '../models/UserModel.js';

// Define the auth controller object
const authController = {
  // User signup
  userSignup: async (req, res) => {
    try {
      /*
        #swagger.auto = false

        #swagger.path = '/auth/signup'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.tags = ['Auth']
        #swagger.summary = 'Create a new user'
        #swagger.description = 'Endpoint to create a new user'
        #swagger.parameters['body'] = {
          in: 'body',
          description: 'User information',
          required: true,
          schema: {
            name: "Shishir",
            email: "sspdav02@gmail.com",
            password: "Shishir#1976",
            role: "student"
          }
        }
      */
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        // #swagger.responses[400] = { description: 'Missing required fields', schema: { data: null, error: 'Missing required fields' } }
        res.status(400).json({ data: null, error: 'Missing required fields' });
        return;
      }

      // Check for valid email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        // #swagger.responses[400] = { description: 'Invalid email format', schema: { data: null, error: 'Invalid email format' } }
        res.status(400).json({ data: null, error: 'Invalid email format' });
        return;
      }

      // Hash the password and create the user
      const hashedPassword = await bcrypt.hash(password, 10);
      const userRole = role || 'student';
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: userRole,
      });

      // Generate access token
      const accessToken = jwt.sign(
        { _id: user._id, name: user.name, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1d',
        }
      );

      // Set token in cookie and respond with user data
      // #swagger.responses[201] = { description: 'User created', schema: { data: { _id: '60f1b0b3b3b3b30015f1b0b3', name: 'Shishir', email: 'sspdav02@gmail.com', role: 'student' }, error: null } }
      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .status(201)
        .json({
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          error: null,
        });
      return;
    } catch (error) {
      // Check if error is a MongoDB duplicate key error
      if (error instanceof Error && error.code === 11000) {
        // #swagger.responses[400] = { description: 'Email already in use', schema: { data: null, error: 'Email already in use' } }
        res.status(400).json({ data: null, error: 'Email already in use' });
        return;
      }
      console.error('Signup error:', error);
      // #swagger.responses[500] = { description: 'Internal Server Error', schema: { data: null, error: 'Internal Server Error' } }
      res.status(500).json({ data: null, error: 'Internal Server Error' });
      return;
    }
  },
  // User login
  userLogin: async (req, res) => {
    try {
      /*
        #swagger.auto = false

        #swagger.path = '/auth/login'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.tags = ['Auth']
        #swagger.summary = 'Login user'
        #swagger.description = 'Endpoint to login user'
        #swagger.parameters['body'] = {
          in: 'body',
          description: 'User credentials',
          required: true,
          schema: {
            email: "sspdav02@gmail.com",
            password: "Shishir#1976"
          }
        }
      */
      const { email, password } = req.body;
      if (!email || !password) {
        // #swagger.responses[400] = { description: 'Missing required fields', schema: { data: null, error: 'Missing required fields' } }
        res.status(400).json({ data: null, error: 'Missing required fields' });
        return;
      }

      const user = await User.findOne({ email });
      if (!user) {
        // #swagger.responses[404] = { description: 'User not found', schema: { data: null, error: 'User not found' } }
        res.status(404).json({ data: null, error: 'User not found' });
        return;
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        // #swagger.responses[401] = { description: 'Invalid Password', schema: { data: null, error: 'Invalid Password' } }
        res.status(401).json({ data: null, error: 'Invalid Password' });
        return;
      }

      // Generate access token
      const accessToken = jwt.sign(
        { _id: user._id, name: user.name, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1d',
        }
      );

      // Set token in cookie and respond with user data
      // #swagger.responses[200] = { description: 'User logged in', schema: { data: { _id: '60f1b0b3b3b3b30015f1b0b3', name: 'Shishir', email: 'sspdav02@gmail.com', role: 'student' }, error: null } }
      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .status(200)
        .json({
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          error: null,
        });
      return;
    } catch (error) {
      console.error(error);
      // #swagger.responses[500] = { description: 'Internal Server Error', schema: { data: null, error: 'Internal Server Error' } }
      res.status(500).json({ data: null, error: 'Internal Server Error' });
      return;
    }
  },
  // User logout
  userLogout: async (req, res) => {
    try {
      /*
        #swagger.auto = false

        #swagger.path = '/auth/logout'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.tags = ['Auth']
        #swagger.summary = 'Logout user'
        #swagger.description = 'Endpoint to logout user'
        #swagger.security = [{ bearerAuth: [] }]
        #swagger.responses[204] = {
          description: 'User logged out',
          schema: { data: null, error: null }
        }
      */
      res
        .clearCookie('accessToken', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .status(204)
        .json();
      return;
    } catch (error) {
      console.error('Logout error:', error);
      // #swagger.responses[500] = { description: 'Internal Server Error', schema: { data: null, error: 'Internal Server Error' } }
      res.status(500).json({ data: null, error: 'Internal Server Error' });
      return;
    }
  },
};

// Export the auth controller
export default authController;
