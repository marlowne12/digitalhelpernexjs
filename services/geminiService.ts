import { GoogleGenAI } from "@google/genai";
import { ChatMessage, CaseStudy, BusinessAuditResult } from "../types";

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

class GeminiService {
  private ai: GoogleGenAI;
  private chatModelId: string = "gemini-3-pro-preview"; // Updated for smarter chat
  private flashModelId: string = "gemini-2.5-flash";
  private thinkingModelId: string = "gemini-3-pro-preview";
  private imageModelId: string = "gemini-2.5-flash-image"; // Nano banana

  constructor() {
    // API Key is assumed to be available in process.env.API_KEY per instructions
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async sendMessage(history: ChatMessage[], newMessage: string): Promise<string> {
    try {
      const chat = this.ai.chats.create({
        model: this.chatModelId, // Using gemini-3-pro-preview
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history
            .filter(h => h.role !== 'system')
            .map(h => ({
                role: h.role,
                parts: [{ text: h.text }]
            }))
      });

      const response = await chat.sendMessage({
        message: newMessage
      });

      return response.text || "I apologize, but I'm having trouble processing that right now.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "System malfunction. Please try again later or contact us directly via email.";
    }
  }

  async generateEmailDraft(topic: string, name: string): Promise<string> {
      try {
        const response = await this.ai.models.generateContent({
            model: this.flashModelId,
            config: {
                systemInstruction: "You are an AI assistant helping a user write a business inquiry email to a web agency."
            },
            contents: `Write a short, professional inquiry email from ${name} about: ${topic}. Keep it under 50 words.`
        });
        return response.text || "";
      } catch (e) {
          console.error(e);
          return "Could not generate draft.";
      }
  }

  async analyzeBusinessWithMaps(businessName: string, location: string): Promise<BusinessAuditResult> {
    try {
      // Use Gemini 2.5 Flash with Google Maps to find real data
      const response = await this.ai.models.generateContent({
        model: this.flashModelId,
        contents: `Find the business "${businessName}" in "${location}". 
                   1. Confirm you found it. 
                   2. What is their address and current rating?
                   3. Summarize 2 recent reviews if available.
                   4. Create a brief "Website Concept" for them. Describe a modern hero section visual, color palette suggestion, and a specific feature they need (e.g. "Online Booking for dentists").`,
        config: {
          tools: [{ googleMaps: {} }],
        }
      });

      // Extract text
      const text = response.text || "Could not find business details.";
      
      // Extract Maps URL from grounding chunks
      let mapLink = "";
      let mapTitle = "";
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        // Look for the first valid map link
        for (const chunk of groundingChunks) {
           if (chunk.web?.uri && chunk.web.uri.includes('google.com/maps')) {
             mapLink = chunk.web.uri;
             mapTitle = chunk.web.title || "View on Google Maps";
             break;
           }
        }
      }

      return {
        analysis: text,
        mapLink,
        mapTitle
      };
    } catch (e) {
      console.error("Maps Analysis Error", e);
      return { analysis: "Could not connect to Maps data at this time." };
    }
  }

  // --- Case Study / Demo Generation ---

  async generateCaseStudyText(industry: string): Promise<Omit<CaseStudy, 'id' | 'imageUrl'>> {
    try {
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

      // Using gemini-3-pro-preview for better creative writing and reasoning
      const response = await this.ai.models.generateContent({
        model: this.thinkingModelId,
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 32768 } // allocating max thinking budget for creativity
        }
      });

      const text = response.text || "{}";
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanText);
    } catch (e) {
      console.error("Text Gen Error", e);
      throw new Error("Failed to generate case study text");
    }
  }

  async generateCaseStudyImage(industry: string): Promise<string> {
    try {
      // Using gemini-2.5-flash-image for image generation (Nano Banana)
      const prompt = `A professional, modern website landing page design for a ${industry} business. High quality, UI/UX portfolio shot, photorealistic, 4k, trending on dribbble.`;
      
      const response = await this.ai.models.generateContent({
        model: this.imageModelId,
        contents: {
            parts: [{ text: prompt }]
        }
      });

      // Extract image from response
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      throw new Error("No image data found");
    } catch (e) {
      console.error("Image Gen Error", e);
      return `https://picsum.photos/800/600?random=${Date.now()}`;
    }
  }
}

export const geminiService = new GeminiService();
