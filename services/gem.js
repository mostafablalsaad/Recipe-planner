
// const axios = require('axios');
// require('dotenv').config();
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
const generateRecipesFromGemini = async (ingredients) => {
  const prompt = `Suggest 1–2 meal recipes using these ingredients: ${ingredients.join(', ')}. 
Return title and instructions for each recipe.`;
console.log("start");
  try {
      if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not set");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
         contents: prompt,
    });
      console.log(response.text);
    console.log("result");
    // const rawText = response.data.candidates[0]?.content?.parts[0]?.text || '';
    // const recipes = parseRecipes(rawText);
    // return recipes;
  } catch (err) {
    console.error('Gemini error:', err);
    // return [{ title: 'Error generating recipe', instructions: 'Try again later.' }];
  }
};
