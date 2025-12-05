import { GoogleGenAI, Type } from "@google/genai";
import { Product, AIAnalysisResult } from '../types';

const getAIClient = () => {
    // Ensuring API key is present
    if (!process.env.API_KEY) {
        throw new Error("API Key is missing.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateProductDescription = async (name: string, category: string): Promise<string> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a compelling, short marketing description (max 2 sentences) for a product named "${name}" in the category "${category}".`,
        });
        return response.text || "No description generated.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error generating description. Please try again.";
    }
};

export const analyzeInventory = async (products: Product[]): Promise<AIAnalysisResult> => {
    try {
        const ai = getAIClient();
        
        // Optimize payload size by sending only relevant fields
        const simplifiedInventory = products.map(p => ({
            name: p.name,
            qty: p.quantity,
            min: p.minStock,
            cat: p.category,
            price: p.price
        }));

        const prompt = `
        Act as an Inventory Expert. Analyze this stock data: ${JSON.stringify(simplifiedInventory)}.
        Provide a strategic summary, specific recommendations for restocking or sales, and a list of high-priority restock items.
        Return JSON data conforming to the schema.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: { type: Type.STRING, description: "A brief 2-3 sentence overview of the stock health." },
                        recommendations: { 
                            type: Type.ARRAY, 
                            items: { type: Type.STRING },
                            description: "Actionable business advice based on data."
                        },
                        restockPriority: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "Names of products that urgently need restocking."
                        }
                    },
                    required: ["summary", "recommendations", "restockPriority"]
                }
            }
        });

        if (response.text) {
             return JSON.parse(response.text) as AIAnalysisResult;
        }
        throw new Error("Empty response from AI");

    } catch (error) {
        console.error("Inventory Analysis Error:", error);
        return {
            summary: "Unable to analyze inventory at this time.",
            recommendations: ["Check your network connection", "Verify API Key"],
            restockPriority: []
        };
    }
};
