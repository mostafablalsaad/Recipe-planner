import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import recipeRoutes from './routes/recipes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Meal planner running on http://localhost:${PORT}`));

