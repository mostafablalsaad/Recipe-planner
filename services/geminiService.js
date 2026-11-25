// const axios = require('axios');
// require('dotenv').config();
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
export const generateRecipesFromGemini = async (ingredients) => {
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
    const recipes = parseRecipes(response.text);
    return recipes;
  } catch (err) {
    console.error('Gemini error:', err);
    return [{ title: 'Error generating recipe', instructions: 'Try again later.' }];
  }
};

// Very basic parser for response
function parseRecipes(text) {
  const recipes = [];

  // Match both styles: "### 1. Title" OR "### Recipe 2: Title"
  const blocks = text.split(/(?=^###\s*(?:Recipe\s*\d+:|\d+\.)\s*)/gm).slice(1);
  blocks.forEach(block => {
    // Extract the title using regex to handle both styles
    const titleMatch = block.match(/^###\s*(?:Recipe\s*\d+:|\d+\.)\s*(.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled';

    // Try to extract everything after **Instructions:** or after the title
    const instructionsSplit = block.split(/\*\*Instructions:\*\*/);
    const instructions = instructionsSplit.length > 1
      ? instructionsSplit[1].trim()
      : block.replace(/^###.*$/m, '').trim(); // fallback: use block minus title line

    recipes.push({ title, instructions });
  });

  return recipes;
}
