const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// GET /api/recipes - Fetch all recipes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// GET /api/recipes/:id - Fetch a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching recipe:', err);
    res.status(500).json({ message: 'Error fetching recipe' });
  }
});

// POST /api/recipes - Create a new recipe
router.post('/', async (req, res) => {
  try {
    const { name, ingredients, instructions, category } = req.body;
    
    // Basic validation
    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ message: 'Name, ingredients, and instructions are required' });
    }
    
    const result = await pool.query(
      'INSERT INTO recipes (name, ingredients, instructions, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, ingredients, instructions, category || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating recipe:', err);
    res.status(500).json({ message: 'Error creating recipe' });
  }
});

// PUT /api/recipes/:id - Update an existing recipe
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, instructions, category } = req.body;
    
    // Basic validation
    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ message: 'Name, ingredients, and instructions are required' });
    }
    
    const result = await pool.query(
      'UPDATE recipes SET name = $1, ingredients = $2, instructions = $3, category = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [name, ingredients, instructions, category || null, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating recipe:', err);
    res.status(500).json({ message: 'Error updating recipe' });
  }
});

// DELETE /api/recipes/:id - Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM recipes WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.json({ message: 'Recipe deleted successfully', recipe: result.rows[0] });
  } catch (err) {
    console.error('Error deleting recipe:', err);
    res.status(500).json({ message: 'Error deleting recipe' });
  }
});

module.exports = router; 