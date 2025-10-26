
import { GoogleGenAI, Type } from "@google/genai";
import type { NutritionalInfo } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = "gemini-2.5-flash";

const schema = {
  type: Type.OBJECT,
  properties: {
    foodName: {
      type: Type.STRING,
      description: "The name of the primary food item identified in the image.",
    },
    caloriesPer100g: {
      type: Type.NUMBER,
      description: "Estimated number of kilocalories per 100 grams of the food.",
    },
    proteinPer100g: {
      type: Type.NUMBER,
      description: "Estimated grams of protein per 100 grams.",
    },
    carbsPer100g: {
      type: Type.NUMBER,
      description: "Estimated grams of carbohydrates per 100 grams.",
    },
    fatPer100g: {
      type: Type.NUMBER,
      description: "Estimated grams of fat per 100 grams.",
    },
  },
  required: ["foodName", "caloriesPer100g", "proteinPer100g", "carbsPer100g", "fatPer100g"],
};

export const getNutritionalInfoFromImage = async (
  base64ImageData: string,
  mimeType: string
): Promise<NutritionalInfo> => {
  const prompt = `
    Analyze the food item in this image.
    Identify the single, primary food item. If there are multiple, focus on the most prominent one.
    Provide an estimated calorie count and nutritional information (protein, carbs, fat) per 100 grams.
    Return the response strictly as a JSON object matching the provided schema. Do not include any markdown formatting or any other text outside the JSON object.
    If the image does not contain food, return a JSON object with "foodName" as "Not food" and all other numeric values as 0.
  `;

  try {
    const imagePart = {
      inlineData: {
        data: base64ImageData,
        mimeType,
      },
    };
    
    const textPart = {
        text: prompt
    };

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString) as NutritionalInfo;

    if (parsedData.foodName === "Not food") {
        throw new Error("The uploaded image does not appear to contain food.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get nutritional information from the image. Please try another image.");
  }
};
