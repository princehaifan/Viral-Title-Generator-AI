
import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedTitle } from '../types';
import { Tier } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    titles: {
      type: Type.ARRAY,
      description: "An array of 5 to 7 generated video titles.",
      items: {
        type: Type.OBJECT,
        properties: {
          text: {
            type: Type.STRING,
            description: "The generated video title text."
          },
          tier: {
            type: Type.STRING,
            enum: [Tier.S, Tier.A, Tier.B],
            description: "The predicted viral potential tier."
          }
        },
        required: ["text", "tier"]
      }
    }
  },
  required: ["titles"]
};


export const generateTitles = async (topic: string, customData: string | null): Promise<GeneratedTitle[]> => {
  try {
    const systemInstruction = `You are HeadlineForge AI, an expert in crafting viral, high-click-through-rate (CTR) video titles for platforms like YouTube and TikTok. Your goal is to help content creators grow their audience. Analyze the user's video topic and any provided example titles to generate compelling, new titles. You must categorize your generated titles into three tiers of predicted viral potential: ${Tier.S} (highest potential), ${Tier.A} (strong potential), and ${Tier.B} (good potential). Always respond in the requested JSON format.`;
    
    const userPrompt = `
      Video Topic: "${topic}"

      ${customData ? `Here are examples of the creator's past successful titles. Learn their style, tone, and structure to create similar high-performing titles:\n\n${customData}` : 'Generate titles based on general viral best practices.'}

      Please generate 7 new titles for the given video topic.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);

    if (parsed.titles && Array.isArray(parsed.titles)) {
      return parsed.titles.map((t: any, index: number) => ({
        id: `gen-${Date.now()}-${index}`,
        text: t.text,
        tier: t.tier as Tier,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error generating titles:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate titles: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating titles.");
  }
};
