import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic, name } = req.body;

    if (!topic || !name) {
      return res.status(400).json({ error: 'Topic and name are required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "You are an AI assistant helping a user write a business inquiry email to a web agency."
      },
      contents: `Write a short, professional inquiry email from ${name} about: ${topic}. Keep it under 50 words.`
    });

    return res.status(200).json({
      text: response.text || ""
    });
  } catch (error) {
    console.error("Email draft error:", error);
    return res.status(500).json({
      error: "Could not generate draft."
    });
  }
}
