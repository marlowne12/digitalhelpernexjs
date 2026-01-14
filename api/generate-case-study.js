import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { industry } = req.body;

    if (!industry) {
      return res.status(400).json({ error: 'Industry is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Generate text
    const prompt = `
      Create a realistic, detailed case study for a fictional local business in the "${industry}" industry located in Washington state.
      The business had an old, terrible website and "Digital Helper" agency fixed it.
      Return ONLY a JSON object with the following fields:
      - client: (Name of the business)
      - industry: (The industry)
      - challenge: (2 sentences on why their old site was bad)
      - solution: (2 sentences on what Digital Helper built, mentioning React/Next.js/AI)
      - results: (Array of 3 strings, e.g. "300% more leads", "Load time under 1s", "#1 Google Ranking")

      Do not include markdown formatting like \`\`\`json. Just the raw JSON string.
    `;

    const textResponse = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });

    const text = textResponse.text || "{}";
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const caseStudyData = JSON.parse(cleanText);

    // Generate image
    const imagePrompt = `A professional, modern website landing page design for a ${industry} business. High quality, UI/UX portfolio shot, photorealistic, 4k, trending on dribbble.`;

    let imageUrl = `https://picsum.photos/800/600?random=${Date.now()}`;

    try {
      const imageResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [{ text: imagePrompt }]
        }
      });

      for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    } catch (imgError) {
      console.error("Image generation error:", imgError);
      // Falls back to placeholder
    }

    return res.status(200).json({
      ...caseStudyData,
      imageUrl
    });
  } catch (error) {
    console.error("Case study generation error:", error);
    return res.status(500).json({
      error: "Failed to generate case study"
    });
  }
}
