const express = require('express');
const db = require('../config/database-sqlite');
const router = express.Router();

// GET /api/recipes - Fetch all recipes
router.get('/', (req, res) => {
  db.all('SELECT * FROM recipes ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error('Error fetching recipes:', err);
      return res.status(500).json({ message: 'Error fetching recipes' });
    }
    res.json(rows);
  });
});

// GET /api/recipes/:id - Fetch a single recipe by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM recipes WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching recipe:', err);
      return res.status(500).json({ message: 'Error fetching recipe' });
    }
    
    if (!row) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.json(row);
  });
});

// POST /api/recipes - Create a new recipe
router.post('/', (req, res) => {
  const { name, ingredients, instructions, category } = req.body;
  
  // Basic validation
  if (!name || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Name, ingredients, and instructions are required' });
  }
  
  const query = `
    INSERT INTO recipes (name, ingredients, instructions, category)
    VALUES (?, ?, ?, ?)
  `;
  
  db.run(query, [name, ingredients, instructions, category || null], function(err) {
    if (err) {
      console.error('Error creating recipe:', err);
      return res.status(500).json({ message: 'Error creating recipe' });
    }
    
    // Fetch the created recipe
    db.get('SELECT * FROM recipes WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        console.error('Error fetching created recipe:', err);
        return res.status(500).json({ message: 'Error fetching created recipe' });
      }
      
      res.status(201).json(row);
    });
  });
});

// PUT /api/recipes/:id - Update an existing recipe
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions, category } = req.body;
  
  // Basic validation
  if (!name || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Name, ingredients, and instructions are required' });
  }
  
  const query = `
    UPDATE recipes 
    SET name = ?, ingredients = ?, instructions = ?, category = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  
  db.run(query, [name, ingredients, instructions, category || null, id], function(err) {
    if (err) {
      console.error('Error updating recipe:', err);
      return res.status(500).json({ message: 'Error updating recipe' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    // Fetch the updated recipe
    db.get('SELECT * FROM recipes WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Error fetching updated recipe:', err);
        return res.status(500).json({ message: 'Error fetching updated recipe' });
      }
      
      res.json(row);
    });
  });
});

// DELETE /api/recipes/:id - Delete a recipe
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // First, get the recipe to return it in the response
  db.get('SELECT * FROM recipes WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching recipe for deletion:', err);
      return res.status(500).json({ message: 'Error deleting recipe' });
    }
    
    if (!row) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    // Delete the recipe
    db.run('DELETE FROM recipes WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error deleting recipe:', err);
        return res.status(500).json({ message: 'Error deleting recipe' });
      }
      
      res.json({ message: 'Recipe deleted successfully', recipe: row });
    });
  });
});

module.exports = router; 