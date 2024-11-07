import {
  generateQuestions,
  getRelatedDocuments,
  generateSummary,
  generateContent,
} from '../utils/aiUtils.js';

const aiController = {
  generateQuestion: async (req, res) => {
    try {
      /*
        #swagger.auto = false
        #swagger.path = '/ai/generate-question'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.tags = ['AI']
        #swagger.parameter['body'] = {
          in: 'body',
          description: 'Generate questions',
          required: true,
          schema: {
            topic: 'JavaScript',
            difficulty: 'medium'
          }
        }
        #swagger.responses[200] = { 
          description: 'Questions generated successfully',
          schema: { data: { questions: [] }, error: null }
        }
        #swagger.responses[400] = { 
          description: 'Topic is required to generate questions',
          schema: { data: null, error: 'Topic is required to generate questions' }
        }
        #swagger.responses[500] = { 
          description: 'Question generation failed',
          schema: { data: null, error: 'Question generation failed' }
        }
      */
      const { topic, difficulty } = req.body;
      if (!topic) {
        res.status(400).json({
          data: null,
          error: 'Topic is required to generate questions',
        });
        return;
      }
      const questions = await generateQuestions(topic, difficulty || 'medium');
      res.status(200).json({ data: questions, error: null });
    } catch (error) {
      console.error('Error in generateQuestion:', error);
      res.status(500).json({ data: null, error: 'Question generation failed' });
    }
  },

  relatedDocuments: async (req, res) => {
    try {
      /*
        #swagger.auto = false
        #swagger.path = '/ai/related-documents'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.tags = ['AI']
        #swagger.parameter['body'] = {
          in: 'body',
          description: 'Fetch related documents',
          required: true,
          schema: {
            topic: 'JavaScript'
          }
        }
        #swagger.responses[200] = { 
          description: 'Related documents fetched successfully',
          schema: { data: { documents: [] }, error: null }
        }
        #swagger.responses[400] = { 
          description: 'Topic is required to fetch related documents',
          schema: { data: null, error: 'Topic is required to fetch related documents' }
        }
        #swagger.responses[500] = { 
          description: 'Failed to fetch related documents',
          schema: { data: null, error: 'Failed to fetch related documents' }
        }
      */
      const { topic } = req.body;
      if (!topic) {
        res.status(400).json({
          data: null,
          error: 'Topic is required to fetch related documents',
        });
        return;
      }
      const documents = await getRelatedDocuments(topic);
      res.status(200).json({ data: documents, error: null });
    } catch (error) {
      console.error('Error in relatedDocuments:', error);
      res
        .status(500)
        .json({ data: null, error: 'Failed to fetch related documents' });
    }
  },

  generateSummary: async (req, res) => {
    try {
      /*
        #swagger.auto = false
        #swagger.path = '/ai/generate-summary'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.tags = ['AI']
        #swagger.parameter['body'] = {
          in: 'body',
          description: 'Generate summary',
          required: true,
          schema: {
            topic: 'JavaScript'
          }
        }
        #swagger.responses[200] = { 
          description: 'Summary generated successfully',
          schema: { data: { summary: '' }, error: null }
        }
        #swagger.responses[400] = { 
          description: 'Topic is required to generate summary',
          schema: { data: null, error: 'Topic is required to generate summary' }
        }
        #swagger.responses[500] = { 
          description: 'Failed to generate summary',
          schema: { data: null, error: 'Failed to generate summary' }
        }
      */
      const { topic } = req.body;
      if (!topic) {
        res.status(400).json({
          data: null,
          error: 'Topic is required to generate summary',
        });
        return;
      }
      const summary = await generateSummary(topic);
      res.status(200).json({ data: summary, error: null });
    } catch (error) {
      console.error('Error in generateSummary:', error);
      res.status(500).json({ data: null, error: 'Failed to generate summary' });
    }
  },

  generateContent: async (req, res) => {
    try {
      /*
        #swagger.auto = false
        #swagger.path = '/ai/generate-content'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.tags = ['AI']
        #swagger.parameter['body'] = {
          in: 'body',
          description: 'Generate content',
          required: true,
          schema: {
            topic: 'JavaScript',
            length: 'short'
          }
        }
        #swagger.responses[200] = { 
          description: 'Content generated successfully',
          schema: { data: { content: '' }, error: null }
        }
        #swagger.responses[400] = { 
          description: 'Topic is required to generate content',
          schema: { data: null, error: 'Topic is required to generate content' }
        }
        #swagger.responses[500] = { 
          description: 'Failed to generate content',
          schema: { data: null, error: 'Failed to generate content' }
        }
      */
      const { topic, length = 'short' } = req.body;
      if (!topic) {
        res.status(400).json({
          data: null,
          error: 'Topic is required to generate content',
        });
        return;
      }
      const content = await generateContent(topic, length);
      res.status(200).json({ data: content, error: null });
    } catch (error) {
      console.error('Error in generateContent:', error);
      res.status(500).json({
        data: null,
        error: 'Failed to generate content',
      });
    }
  },
};

// Export the AI controller
export default aiController;
