import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export type EvaluationResult = {
  overallBand: number;
  taskResponse: { score: number; feedback: string };
  coherenceCohesion: { score: number; feedback: string };
  lexicalResource: { score: number; feedback: string };
  grammaticalRange: { score: number; feedback: string };
  keyImprovements: string[];
  feedbackSummary: string;
  topGoal: string;
  highlights: Array<{ originalText: string; type: 'error' | 'warning' | 'good'; suggestion: string }>;
  modelAnswer: string;
};

export async function evaluateEssay(prompt: string, essay: string, type: 'Task 1' | 'Task 2'): Promise<EvaluationResult> {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: `Evaluate the following IELTS Writing ${type} essay.\n\nPrompt: ${prompt}\n\nEssay:\n${essay}`,
    config: {
      systemInstruction: `You are an elite, highly rigorous former IELTS examiner. Your task is to evaluate IELTS Writing Task 1 and Task 2 essays with absolute realism and strictness. 
Follow the official IELTS public band descriptors exactly. DO NOT inflate scores. Most students score between 5.5 and 6.5. Only award 7.0+ for truly advanced, near-native writing. Be highly critical, precise, and constructive.

Return the evaluation in JSON format matching the schema.
1. Provide an overall band score (in half-band increments, e.g., 6.0, 6.5, 7.0).
2. Provide scores and brief, 1-sentence feedback for each of the 4 criteria (Task Response/Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy).
3. Provide 3 specific 'keyImprovements' (actionable advice to improve the score).
4. Provide a 'feedbackSummary' (2-3 sentences summarizing the performance and main weaknesses).
5. Provide a 'topGoal' for the next attempt (1 sentence).
6. Provide 'highlights': identify specific errors, awkward phrasing, or excellent vocabulary in the essay. For EVERY error or awkward phrase (type: 'error' or 'warning'), you MUST provide a native-level 'suggestion' (rewrite). Make sure 'originalText' exactly matches a substring in the essay. Do not highlight entire sentences, just the specific problematic phrase (max 5-7 words).
7. Provide a 'modelAnswer': Write a complete, perfect Band 9.0 model essay answering the prompt.`,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallBand: { type: Type.NUMBER, description: 'Overall estimated band score (0-9)' },
          taskResponse: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              feedback: { type: Type.STRING }
            },
            required: ['score', 'feedback']
          },
          coherenceCohesion: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              feedback: { type: Type.STRING }
            },
            required: ['score', 'feedback']
          },
          lexicalResource: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              feedback: { type: Type.STRING }
            },
            required: ['score', 'feedback']
          },
          grammaticalRange: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              feedback: { type: Type.STRING }
            },
            required: ['score', 'feedback']
          },
          keyImprovements: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          feedbackSummary: { type: Type.STRING },
          topGoal: { type: Type.STRING },
          modelAnswer: { type: Type.STRING, description: 'A complete, perfect Band 9.0 model essay answering the prompt.' },
          highlights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                originalText: { type: Type.STRING, description: 'Exact substring from the essay' },
                type: { type: Type.STRING, description: 'Must be one of: error, warning, good' },
                suggestion: { type: Type.STRING, description: 'Correction or better alternative' }
              },
              required: ['originalText', 'type', 'suggestion']
            }
          }
        },
        required: ['overallBand', 'taskResponse', 'coherenceCohesion', 'lexicalResource', 'grammaticalRange', 'keyImprovements', 'feedbackSummary', 'topGoal', 'modelAnswer', 'highlights']
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error('No response from AI');
  
  try {
    // Clean up potential markdown code blocks
    const cleanedText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    return JSON.parse(cleanedText) as EvaluationResult;
  } catch (e) {
    console.error("Failed to parse AI response:", text);
    throw new Error("Invalid response format from AI.");
  }
}
