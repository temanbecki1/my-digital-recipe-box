import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { recipeAPI } from '../services/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await recipeAPI.getRecipe(id);
        setRecipe(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch recipe. Please try again.');
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
      try {
        await recipeAPI.deleteRecipe(id);
        alert('Recipe deleted successfully!');
        navigate('/');
      } catch (err) {
        setError('Failed to delete recipe. Please try again.');
        console.error('Error deleting recipe:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md mx-auto">
          {error}
        </div>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to recipes
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Recipe not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to recipes
        </Link>
      </div>
    );
  }

  // Format ingredients list
  const formatIngredients = (ingredients) => {
    // Split by common delimiters and filter out empty strings
    return ingredients.split(/[,\n]/).map(item => item.trim()).filter(item => item);
  };

  // Format instructions
  const formatInstructions = (instructions) => {
    // Split by numbers followed by period (1. 2. etc.) or newlines
    return instructions.split(/(?=\d+\.)|\n/).map(step => step.trim()).filter(step => step);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to recipes
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.name}</h1>
            {recipe.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {recipe.category}
              </span>
            )}
          </div>
          
          <div className="flex gap-3">
            <Link to={`/edit/${recipe.id}`} className="btn-secondary">
              Edit Recipe
            </Link>
            <button onClick={handleDelete} className="btn-danger">
              Delete Recipe
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {/* Meta Information */}
          <div className="text-sm text-gray-500 mb-6">
            <p>Created: {new Date(recipe.created_at).toLocaleDateString()}</p>
            {recipe.updated_at !== recipe.created_at && (
              <p>Updated: {new Date(recipe.updated_at).toLocaleDateString()}</p>
            )}
          </div>

          {/* Ingredients Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2">
                {formatIngredients(recipe.ingredients).map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructions</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ol className="space-y-3">
                {formatInstructions(recipe.instructions).map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{instruction.replace(/^\d+\.\s*/, '')}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons (Mobile) */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:hidden">
        <Link to={`/edit/${recipe.id}`} className="btn-secondary text-center">
          Edit Recipe
        </Link>
        <button onClick={handleDelete} className="btn-danger">
          Delete Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail; 