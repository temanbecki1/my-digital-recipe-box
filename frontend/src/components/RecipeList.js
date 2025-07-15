import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipeAPI } from '../services/api';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipeAPI.getAllRecipes();
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle recipe deletion
  const handleDelete = async (recipeId, recipeName) => {
    if (window.confirm(`Are you sure you want to delete "${recipeName}"?`)) {
      try {
        await recipeAPI.deleteRecipe(recipeId);
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
        // Show success message (you could use a toast library here)
        alert('Recipe deleted successfully!');
      } catch (err) {
        setError('Failed to delete recipe. Please try again.');
        console.error('Error deleting recipe:', err);
      }
    }
  };

  // Filter recipes based on search term and category
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(recipes.map(recipe => recipe.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Recipe Collection</h1>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <Link to="/add" className="btn-primary whitespace-nowrap">
            Add New Recipe
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={fetchRecipes}
            className="ml-4 text-red-800 underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            {recipes.length === 0 ? 'No recipes found. Add your first recipe!' : 'No recipes match your search.'}
          </p>
          {recipes.length === 0 && (
            <Link to="/add" className="btn-primary">
              Add Your First Recipe
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.name}</h3>
                {recipe.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {recipe.category}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {recipe.ingredients.length > 100 
                  ? recipe.ingredients.substring(0, 100) + '...'
                  : recipe.ingredients
                }
              </p>
              
              <div className="flex justify-between items-center">
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Recipe
                </Link>
                <div className="flex gap-2">
                  <Link
                    to={`/edit/${recipe.id}`}
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(recipe.id, recipe.name)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                Added {new Date(recipe.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList; 