// Import the required models
import Course from '../models/CourseModel.js';
import Test from '../models/TestModel.js';

// Define the instructorController
const instructorController = {
  createCourse: async (req, res) => {
    try {
      /*
        #swagger.auto = false

        #swagger.path = '/instructor/create-course'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.tags = ['Instructor']
        #swagger.summary = 'Create a new course'
        #swagger.description = 'Endpoint to create a new course'
        #swagger.parameters['body'] = {
          in: 'body',
          description: 'Course information',
          required: true,
          schema: {
            title: "Introduction to AI",
            description: "Learn the basics of AI"
          }
        }
      */
      // Explicitly cast req to AuthorizedRequest
      const authorizedReq = req;

      // Extract title and description from the request body
      const { title, description } = authorizedReq.body;
      if (!title || !description) {
        // #swagger.responses[400] = { description: 'Required fields are missing', schema: { data: null, error: 'Required fields are missing' } }
        res
          .status(400)
          .json({ data: null, error: 'Required fields are missing' });
        return;
      }

      const course = await Course.create({
        title,
        description,
        instructor: authorizedReq.user._id,
      });

      // #swagger.responses[201] = { description: 'Course created successfully', schema: { data: { title: "Introduction to AI", description: "Learn the basics of AI" }, error: null } }
      res.status(201).json({ data: course, error: null });
      return;
    } catch (error) {
      console.error(error);
      // #swagger.responses[500] = { description: 'Internal Server Error', schema: { data: null, error: 'Internal Server Error' } }
      res.status(500).json({ data: null, error: 'Internal Server Error' });
      return;
    }
  },
  createTestWithFrequency: async (req, res) => {
    try {
      /*
        #swagger.auto = false

        #swagger.path = '/instructor/create-test'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.tags = ['Instructor']
        #swagger.summary = 'Create a new test with frequency'
        #swagger.description = 'Endpoint to create a new test with frequency'
        #swagger.parameters['body'] = {
          in: 'body',
          description: 'Test information',
          required: true,
          schema: {
            courseId: "60a8b6d5a3f1b1b0b4f9e1d2",
            topic: "Introduction to AI",
            frequency: "daily"
          }
        }
      */
      const { courseId, topic, frequency } = req.body;
      if (!courseId || !topic || !frequency) {
        // #swagger.responses[400] = { description: 'Required fields are missing', schema: { data: null, error: 'Required fields are missing' } }
        res
          .status(400)
          .json({ data: null, error: 'Required fields are missing' });
        return;
      }

      const course = await Course.findById(courseId);
      if (!course) {
        // #swagger.responses[404] = { description: 'Course not found', schema: { data: null, error: 'Course not found' } }
        res.status(404).json({ data: null, error: 'Course not found' });
        return;
      }

      // Create a new test
      const test = await Test.create({
        topic,
        frequency,
        course: courseId,
      });
      // Add test to the course
      course.tests.push(test._id);
      await course.save();
      
      // #swagger.responses[200] = { description: 'Test created successfully', schema: { data: { topic: "Introduction to AI", frequency: "daily" }, error: null } }
      res.status(200).json({ data: test, error: null });
      return;
    } catch (error) {
      console.error(error);
      // #swagger.responses[500] = { description: 'Internal Server Error', schema: { data: null, error: 'Internal Server Error' } }
      res.status(500).json({ data: null, error: 'Internal Server Error' });
      return;
    }
  },
};

// Export the instructorController
export default instructorController;
