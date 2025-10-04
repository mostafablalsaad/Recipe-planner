import pool from "../db.js";
import { generateRecipesFromGemini } from "../services/geminiService.js";

export const renderHome = (req, res) => {
  res.render('index', { recipes: [], ingredients: [] });
};

export const generateRecipe = async (req, res) => {
  const ingredients = req.body.ingredients.split(',').map(i => i.trim());
  const recipes = await generateRecipesFromGemini(ingredients);
  res.render('index', { recipes, ingredients });
};

export const saveRecipe = async (req, res) => {
  const { title, instructions, ingredients } = req.body;
  await pool.query(
    `INSERT INTO recipes (title, instructions, ingredients) VALUES ($1, $2, $3)`,
    [title, instructions, ingredients.split(',')]
  );
  res.redirect('/recipes/saved');
};

export const getSavedRecipes = async (req, res) => {
  const result = await pool.query('SELECT * FROM recipes ORDER BY created_at DESC');
  res.render('saved', { recipes: result.rows });
};

export const deleteRecipe = async (req, res) => {
  await pool.query('DELETE FROM recipes WHERE id = $1', [req.params.id]);
  res.redirect('/recipes/saved');
};

export const submitFeedback = async (req, res) => {
  const { rating, feedback } = req.body;
  await pool.query(
    'UPDATE recipes SET rating = $1, feedback = $2 WHERE id = $3',
    [rating || null, feedback || null, req.params.id]
  );
  res.redirect('/recipes/saved');
};
