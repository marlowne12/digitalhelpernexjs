import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the advanced AI representative for "Digital Helper", a web design agency in Richland, WA.
Your specific mission is to help local businesses who have outdated, slow, or ugly websites.

About Digital Helper:
- Location: Richland, Washington.
- Core Value: We turn outdated "brochure" websites into modern, high-converting sales machines using AI and React.
- Target Audience: Local business owners (plumbers, dentists, restaurants) with sites from the early 2010s or older.
- Services: Complete Website Overhauls, Mobile Optimization, Google Business Profile Sync, AI Content Writing.
- Contact: hello@digitalhelper.com

Rules for your responses:
1. If a user mentions their current site is old, explain the risks (security, lost mobile customers, poor Google ranking).
2. Emphasize that "Digital Helper" handles the entire migration process.
3. Keep answers punchy and professional.
4. Always guide them to the "Free Audit" section or the contact form.
5. If asked about price, mention packages start at $3,000 for a complete modernization.
`;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { history, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: "gemini-3-pro-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history
        .filter((h) => h.role !== 'system')
        .map((h) => ({
          role: h.role,
          parts: [{ text: h.text }]
        }))
    });

    const response = await chat.sendMessage({ message });

    return res.status(200).json({
      text: response.text || "I apologize, but I'm having trouble processing that right now."
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "System malfunction. Please try again later or contact us directly via email."
    });
  }
}
