import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { LogoDetails, LogoResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface LogoGenerationPayload {
  prompts: {
    primary: string;
    horizontal: string;
    vertical: string;
    icon: string;
  };
  logoDescription: string;
}

const generateLogoPrompts = async (details: LogoDetails): Promise<LogoGenerationPayload> => {
    const systemInstruction = `You are a world-class branding expert and creative director. Your task is to generate assets for a new logo kit.
Based on the following details, you must provide a single JSON object with two top-level keys:
1. "prompts": An object containing four detailed, descriptive prompts for an AI image generator (like Imagen) to create a logo set. Each logo must be a vector-style design on a transparent background. Each prompt should be specific about visual elements for its variation. The company name should be elegantly integrated.
    - "primary": The main logo. Balanced and versatile for general use.
    - "horizontal": A wide-format (landscape) version, for website headers.
    - "vertical": A stacked or tall (portrait) version, for sidebars or profile pictures.
    - "icon": Just the logo's core symbol or mark, without the company name, for use as a favicon or app icon.
2. "logoDescription": A short, compelling tagline or description for the company, inspired by the logo concept.

You must only output a single, valid JSON object and nothing else. Ensure the prompts are distinct and tailored to each logo type.`;

    const userPrompt = `
**Company Details:**
- **Name:** ${details.name}
- **Description:** ${details.description}
- **Style:** ${details.style}
- **Colors:** ${details.colors}
`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: userPrompt,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            temperature: 0.8,
        }
    });
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }

    try {
        const parsedData = JSON.parse(jsonStr);
        if (parsedData.prompts && parsedData.logoDescription) {
            return parsedData;
        } else {
            throw new Error("Invalid JSON structure from Gemini.");
        }
    } catch (e) {
        console.error("Failed to parse JSON response from Gemini:", jsonStr, e);
        throw new Error("Could not understand the AI's creative direction. Please try refining your description.");
    }
};

const generateLogoImage = async (prompt: string): Promise<string> => {
    const contents = [
        { role: "user", parts: [{ text: prompt }] }
    ];
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: contents,
        config: {
            responseModalities: ["TEXT", "IMAGE"],
        }
    });
    // Find the image part in the response
    const candidates = response.candidates || [];
    if (candidates.length === 0 || !candidates[0].content || !candidates[0].content.parts) {
        throw new Error("Image generation failed. No candidates returned.");
    }
    for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
            // Return as data URL
            return `data:image/png;base64,${part.inlineData.data}`;
        }
    }
    throw new Error("Image generation failed. The AI couldn't visualize the logo. Please try again.");
};

export const generateLogo = async (details: LogoDetails): Promise<LogoResult> => {
    try {
        const { prompts, logoDescription } = await generateLogoPrompts(details);

        // Generate all images in parallel for speed
        const [primary, horizontal, vertical, icon] = await Promise.all([
            generateLogoImage(prompts.primary),
            generateLogoImage(prompts.horizontal),
            generateLogoImage(prompts.vertical),
            generateLogoImage(prompts.icon),
        ]);

        return {
            images: { primary, horizontal, vertical, icon },
            description: logoDescription,
        };

    } catch (error) {
        console.error("Error during logo generation pipeline:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unknown error occurred during logo generation.");
    }
};
