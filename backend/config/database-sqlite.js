const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, '../database/recipes.db');
const db = new sqlite3.Database(dbPath);

// Initialize database schema
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert sample data if table is empty
  db.get("SELECT COUNT(*) as count FROM recipes", (err, row) => {
    if (err) {
      console.error('Error checking recipes table:', err);
      return;
    }
    
    if (row.count === 0) {
      console.log('Inserting sample recipes...');
      const sampleRecipes = [
        {
          name: 'Chocolate Chip Cookies',
          ingredients: '2 1/4 cups all-purpose flour, 1 tsp baking soda, 1 tsp salt, 1 cup butter, 3/4 cup granulated sugar, 3/4 cup brown sugar, 2 eggs, 2 tsp vanilla extract, 2 cups chocolate chips',
          instructions: '1. Preheat oven to 375°F. 2. Mix flour, baking soda, and salt in a bowl. 3. Cream butter and sugars, add eggs and vanilla. 4. Gradually add flour mixture. 5. Stir in chocolate chips. 6. Drop spoonfuls on baking sheet. 7. Bake 9-11 minutes.',
          category: 'Dessert'
        },
        {
          name: 'Caesar Salad',
          ingredients: '1 large head romaine lettuce, 1/2 cup parmesan cheese, 1/4 cup croutons, Caesar dressing, 2 tbsp lemon juice, 2 cloves garlic, 2 anchovy fillets',
          instructions: '1. Wash and chop romaine lettuce. 2. Make dressing with garlic, anchovies, lemon juice. 3. Toss lettuce with dressing. 4. Add parmesan and croutons. 5. Serve immediately.',
          category: 'Lunch'
        },
        {
          name: 'Pancakes',
          ingredients: '1 1/2 cups flour, 3 1/2 tsp baking powder, 1 tsp salt, 1 tbsp sugar, 1 1/4 cups milk, 1 egg, 3 tbsp melted butter',
          instructions: '1. Mix dry ingredients in a bowl. 2. In another bowl, whisk milk, egg, and melted butter. 3. Combine wet and dry ingredients. 4. Heat griddle and cook pancakes until bubbles form. 5. Flip and cook until golden.',
          category: 'Breakfast'
        }
      ];

      const stmt = db.prepare(`
        INSERT INTO recipes (name, ingredients, instructions, category)
        VALUES (?, ?, ?, ?)
      `);

      sampleRecipes.forEach(recipe => {
        stmt.run(recipe.name, recipe.ingredients, recipe.instructions, recipe.category);
      });

      stmt.finalize();
      console.log('Sample recipes inserted successfully!');
    }
  });
});

console.log('Connected to SQLite database at:', dbPath);

module.exports = db; 