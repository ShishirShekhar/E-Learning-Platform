// Import OpenAI module
import { OpenAI } from 'openai';

// Initialize OpenAI client once (Singleton pattern)
let openai = null;

// Get OpenAI client instance, initialized with API key
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey)
    throw new Error('OPENAI_API_KEY environment variable is not defined.');

  if (!openai) {
    openai = new OpenAI({ apiKey });
  }

  return openai;
}

/**
 * Generate quiz-style questions based on the provided topic and difficulty.
 * @param {string} topic - Subject of the questions.
 * @param {string} [difficulty='medium'] - Difficulty level of questions (e.g., 'easy', 'medium', 'hard').
 * @returns {Promise<string[]>} - List of generated questions.
 */
export async function generateQuestions(topic, difficulty = 'medium') {
  try {
    const prompt = `Generate ${difficulty} level questions for the topic: "${topic}". Please provide concise, quiz-style questions with answers.`;

    const openaiClient = getOpenAIClient();
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content)
      throw new Error('Failed to generate questions: No content returned');

    return content
      .trim()
      .split('\n')
      .map((q) => q.trim());
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate questions.');
  }
}

/**
 * Retrieve summaries of documents related to a specific topic.
 * @param {string} topic - Topic to find related documents.
 * @returns {Promise<string[]>} - List of summaries or key points about related documents.
 */
export async function getRelatedDocuments(topic) {
  try {
    const prompt = `Provide a list of brief summaries or key information about documents related to the topic "${topic}". Focus on essential details.`;

    const openaiClient = getOpenAIClient();
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.5,
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content)
      throw new Error(
        'Failed to retrieve related documents: No content returned'
      );

    return content
      .trim()
      .split('\n')
      .map((doc) => doc.trim());
  } catch (error) {
    console.error('Error retrieving related documents:', error);
    throw new Error('Failed to retrieve related documents.');
  }
}

/**
 * Generate a concise summary for a specified topic.
 * @param {string} topic - Topic to summarize.
 * @returns {Promise<string>} - Generated summary of the topic.
 */
export async function generateSummary(topic) {
  try {
    const summaryPrompt = `Provide a concise summary with key insights on the topic: "${topic}".`;

    const openaiClient = getOpenAIClient();
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: summaryPrompt }],
      max_tokens: 300,
      temperature: 0.5,
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content)
      throw new Error('Failed to generate summary: No content returned');

    return content.trim();
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Failed to generate summary.');
  }
}

/**
 * Generate an article on a given topic with specified length.
 * @param {string} topic - Topic for content generation.
 * @param {string} [length='short'] - Desired article length ('short' or 'long').
 * @returns {Promise<string>} - Generated article content.
 */
export async function generateContent(topic, length = 'short') {
  try {
    const contentPrompt = `Write a ${length} article about "${topic}".`;

    const openaiClient = getOpenAIClient();
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: contentPrompt }],
      max_tokens: length === 'long' ? 1000 : 500,
      temperature: 0.7,
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content)
      throw new Error('Failed to generate content: No content returned');

    return content.trim();
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content.');
  }
}
