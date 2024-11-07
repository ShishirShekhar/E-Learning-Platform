// Import User and Course models
import User from '../models/UserModel.js';
import Course from '../models/CourseModel.js';

// Define the student controller
const studentController = {
  // Enroll a student in a course
  enrollCourse: async (req, res) => {
    try {
      /*
        #swagger.auto = false

        #swagger.path = '/student/enroll'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.tags = ['Student']
        #swagger.summary = 'Enroll in a course'
        #swagger.description = 'Endpoint to enroll a student in a course'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['body'] = {
          in: 'body',
          description: 'Course ID',
          required: true,
          schema: {
            courseId: "611f0f0e9b3f6d001f2e7d6f"
          }
        }
      */
      // Explicitly cast req to AuthorizedRequest
      const authorizedReq = req;

      const { courseId } = authorizedReq.body;
      // Check if courseId is provided
      if (!courseId) {
        // #swagger.responses[400] = { description: 'Course ID is required', schema: { data: null, error: 'Course ID is required' } }
        res.status(400).json({ data: null, error: 'Course ID is required' });
        return;
      }

      // Check if course exists
      const course = await Course.findById(courseId);
      if (!course) {
        // #swagger.responses[404] = { description: 'Course not found', schema: { data: null, error: 'Course not found' } }
        res.status(404).json({ data: null, error: 'Course not found' });
        return;
      }

      // Find student by their user ID
      const student = await User.findById(authorizedReq.user._id);
      // Check if student exists
      if (!student) {
        // #swagger.responses[404] = { description: 'Student not found', schema: { data: null, error: 'Student not found' } }
        res.status(404).json({ data: null, error: 'Student not found' });
        return;
      }

      // Check if the student is already enrolled in the course
      if (student.courses?.includes(courseId)) {
        // #swagger.responses[400] = { description: 'Student is already enrolled in this course', schema: { data: null, error: 'Student is already enrolled in this course' } }
        res.status(400).json({
          data: null,
          error: 'Student is already enrolled in this course',
        });
        return;
      }

      // Enroll student
      student.courses.push(courseId);
      await student.save();
      course.students.push(student._id);
      await course.save();
      /* #swagger.responses[200] = {
          description: 'Enrollment successful',
          schema: {
            data: {
              message: 'Enrollment successful',
              student: {
                _id: '60f1b0b3b3b3b30015f1b0b3',
                name: 'Shishir',
                email: 'sspdav02@gmail.com',
                role: 'student',
                courses: ['611f0f0e9b3f6d001f2e7d6f']
              }
            },
            error: null
          }
        }
      */
      res.status(200).json({
        data: { message: 'Enrollment successful', student },
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
  // View progress of all courses the student is enrolled in
  viewProgress: async (req, res) => {
    try {
      /*
        #swagger.auto = false

        #swagger.path = '/student/progress'
        #swagger.method = 'get'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.tags = ['Student']
        #swagger.summary = 'View progress'
        #swagger.description = 'Endpoint to view progress of all courses the student is enrolled in'
        #swagger.security = [{ "bearerAuth": [] }]
      */
      // Explicitly cast req to AuthorizedRequest
      const authorizedReq = req;

      // Find student by their user ID and populate the courses
      const student = await User.findById(authorizedReq.user._id)
        .populate('courses')
        .select('name email role courses');
      if (!student) {
        // #swagger.responses[404] = { description: 'Student not found', schema: { data: null, error: 'Student not found' } }
        res.status(404).json({ data: null, error: 'Student not found' });
        return;
      }
      /* #swagger.responses[200] = {
          description: 'Student progress retrieved',
          schema: {
            data: {
              _id: '60f1b0b3b3b3b30015f1b0b3',
              name: 'Shishir',
              email: 'sspdav02@gmail.com',
              role: 'student',
            },
            error: null
          }
        }
      */
      res.status(200).json({ data: student, error: null });
      return;
    } catch (error) {
      console.error(error);
      // #swagger.responses[500] = { description: 'Internal Server Error', schema: { data: null, error: 'Internal Server Error' } }
      res.status(500).json({ data: null, error: 'Internal Server Error' });
      return;
    }
  },
};

// Export the student controller
export default studentController;
