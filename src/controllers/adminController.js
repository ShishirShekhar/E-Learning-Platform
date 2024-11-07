// Import the required models
import User from '../models/UserModel.js';
import Course from '../models/CourseModel.js';

const adminController = {
  /**
   * Get all users
   * #swagger.auto = false
   * #swagger.path = '/admin/users'
   * #swagger.method = 'post'
   * #swagger.produces = ['application/json']
   * #swagger.consumes = ['application/json']
   * #swagger.tags = ['Admin']
   * #swagger.summary = 'Retrieve all users'
   * #swagger.description = 'Endpoint to fetch all users from the system.'
   * #swagger.security = [{ "bearerAuth": [] }]
   * #swagger.responses[200] = {
   *   description: 'Successfully fetched users.',
   *   schema: { data: [{ _id: 'string', name: 'string', email: 'string', role: 'string' }], error: null }
   * }
   */
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json({ data: users, error: null });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res
        .status(500)
        .json({ data: null, error: 'Failed to fetch users.' });
    }
  },

  /**
   * Delete a user by ID
   * #swagger.auto = false
   * #swagger.path = '/admin/user/{id}'
   * #swagger.method = 'delete'
   * #swagger.produces = ['application/json']
   * #swagger.consumes = ['application/json']
   * #swagger.tags = ['Admin']
   * #swagger.summary = 'Delete a user by ID'
   * #swagger.description = 'Endpoint to delete a specific user by ID.'
   * #swagger.security = [{ "bearerAuth": [] }]
   * #swagger.parameters['id'] = { description: 'User ID' }
   * #swagger.responses[200] = { description: 'User deleted successfully', schema: { data: { _id: 'string', name: 'string', email: 'string', role: 'string' }, error: null } }
   * #swagger.responses[404] = { description: 'User not found', schema: { data: null, error: 'User not found.' } }
   * #swagger.responses[500] = { description: 'Failed to delete user', schema: { data: null, error: 'Failed to delete user.' } }
   */
  deleteUser: async (req, res) => {
    try {
      const { id: userId } = req.params;

      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ data: null, error: 'User not found.' });
      }

      return res.status(200).json({ data: deletedUser, error: null });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res
        .status(500)
        .json({ data: null, error: 'Failed to delete user.' });
    }
  },

  /**
   * Get all courses
   * #swagger.auto = false
   * #swagger.path = '/admin/courses'
   * #swagger.method = 'post'
   * #swagger.produces = ['application/json']
   * #swagger.consumes = ['application/json']
   * #swagger.tags = ['Admin']
   * #swagger.summary = 'Retrieve all courses'
   * #swagger.description = 'Endpoint to fetch all courses along with their instructors.'
   * #swagger.security = [{ "bearerAuth": [] }]
   * #swagger.responses[200] = {
   *   description: 'Successfully fetched courses.',
   *   schema: { data: [{ _id: 'string', title: 'string', description: 'string', instructor: { _id: 'string', name: 'string', email: 'string' } }], error: null }
   * }
   */
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find({}).populate(
        'instructor',
        'name email'
      );
      return res.status(200).json({ data: courses, error: null });
    } catch (error) {
      console.error('Error fetching courses:', error);
      return res
        .status(500)
        .json({ data: null, error: 'Failed to fetch courses.' });
    }
  },

  /**
   * Delete a course by ID
   * #swagger.auto = false
   * #swagger.path = '/admin/course/{id}'
   * #swagger.method = 'delete'
   * #swagger.produces = ['application/json']
   * #swagger.consumes = ['application/json']
   * #swagger.tags = ['Admin']
   * #swagger.summary = 'Delete a course by ID'
   * #swagger.description = 'Endpoint to delete a specific course by ID.'
   * #swagger.security = [{ "bearerAuth": [] }]
   * #swagger.parameters['id'] = { description: 'Course ID' }
   * #swagger.responses[200] = { description: 'Course deleted successfully', schema: { data: { _id: 'string', title: 'string', description: 'string', instructor: 'string' }, error: null } }
   * #swagger.responses[404] = { description: 'Course not found', schema: { data: null, error: 'Course not found.' } }
   * #swagger.responses[500] = { description: 'Failed to delete course', schema: { data: null, error: 'Failed to delete course.' } }
   */
  deleteCourse: async (req, res) => {
    try {
      const { id: courseId } = req.params;

      const deletedCourse = await Course.findByIdAndDelete(courseId);
      if (!deletedCourse) {
        return res.status(404).json({ data: null, error: 'Course not found.' });
      }
      
      return res.status(200).json({ data: deletedCourse, error: null });
    } catch (error) {
      console.error('Error deleting course:', error);
      return res
        .status(500)
        .json({ data: null, error: 'Failed to delete course.' });
    }
  },
};

// Export the admin controller
export default adminController;
