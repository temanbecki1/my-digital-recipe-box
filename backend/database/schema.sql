-- Create the recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create an index on category for better query performance
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);

-- Insert some sample data for testing (optional)
INSERT INTO recipes (name, ingredients, instructions, category) VALUES
('Chocolate Chip Cookies', 
 '2 1/4 cups all-purpose flour, 1 tsp baking soda, 1 tsp salt, 1 cup butter, 3/4 cup granulated sugar, 3/4 cup brown sugar, 2 eggs, 2 tsp vanilla extract, 2 cups chocolate chips',
 '1. Preheat oven to 375°F. 2. Mix flour, baking soda, and salt in a bowl. 3. Cream butter and sugars, add eggs and vanilla. 4. Gradually add flour mixture. 5. Stir in chocolate chips. 6. Drop spoonfuls on baking sheet. 7. Bake 9-11 minutes.',
 'Dessert'),
('Caesar Salad',
 '1 large head romaine lettuce, 1/2 cup parmesan cheese, 1/4 cup croutons, Caesar dressing, 2 tbsp lemon juice, 2 cloves garlic, 2 anchovy fillets',
 '1. Wash and chop romaine lettuce. 2. Make dressing with garlic, anchovies, lemon juice. 3. Toss lettuce with dressing. 4. Add parmesan and croutons. 5. Serve immediately.',
 'Lunch'),
('Pancakes',
 '1 1/2 cups flour, 3 1/2 tsp baking powder, 1 tsp salt, 1 tbsp sugar, 1 1/4 cups milk, 1 egg, 3 tbsp melted butter',
 '1. Mix dry ingredients in a bowl. 2. In another bowl, whisk milk, egg, and melted butter. 3. Combine wet and dry ingredients. 4. Heat griddle and cook pancakes until bubbles form. 5. Flip and cook until golden.',
 'Breakfast'); 