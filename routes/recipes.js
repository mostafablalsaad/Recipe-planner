import express from "express"
const router = express.Router();
import * as controller from "../controllers/recipesController.js";
router.get('/', controller.renderHome);
router.post('/recipes/generate', controller.generateRecipe);
router.post('/recipes/save', controller.saveRecipe);
router.get('/recipes/saved', controller.getSavedRecipes);
router.post('/recipes/delete/:id', controller.deleteRecipe);
router.post('/recipes/feedback/:id', controller.submitFeedback);

export default router;
