import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { businessName, location } = req.body;

    if (!businessName || !location) {
      return res.status(400).json({ error: 'Business name and location are required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find the business "${businessName}" in "${location}".
                 1. Confirm you found it.
                 2. What is their address and current rating?
                 3. Summarize 2 recent reviews if available.
                 4. Create a brief "Website Concept" for them. Describe a modern hero section visual, color palette suggestion, and a specific feature they need (e.g. "Online Booking for dentists").`,
      config: {
        tools: [{ googleMaps: {} }],
      }
    });

    const text = response.text || "Could not find business details.";

    let mapLink = "";
    let mapTitle = "";

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      for (const chunk of groundingChunks) {
        if (chunk.web?.uri && chunk.web.uri.includes('google.com/maps')) {
          mapLink = chunk.web.uri;
          mapTitle = chunk.web.title || "View on Google Maps";
          break;
        }
      }
    }

    return res.status(200).json({
      analysis: text,
      mapLink,
      mapTitle
    });
  } catch (error) {
    console.error("Business analysis error:", error);
    return res.status(500).json({
      error: "Could not connect to Maps data at this time.",
      analysis: "Could not connect to Maps data at this time."
    });
  }
}
