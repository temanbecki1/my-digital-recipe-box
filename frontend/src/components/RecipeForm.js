import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { recipeAPI } from '../services/api';

const RecipeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Will be present if editing
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Fetch recipe data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchRecipe = async () => {
        try {
          setLoading(true);
          const recipe = await recipeAPI.getRecipe(id);
          setFormData({
            name: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            category: recipe.category || ''
          });
          setError(null);
        } catch (err) {
          setError('Failed to fetch recipe data. Please try again.');
          console.error('Error fetching recipe:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchRecipe();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Recipe name is required';
    }
    
    if (!formData.ingredients.trim()) {
      errors.ingredients = 'Ingredients are required';
    }
    
    if (!formData.instructions.trim()) {
      errors.instructions = 'Instructions are required';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      if (isEditing) {
        await recipeAPI.updateRecipe(id, formData);
        alert('Recipe updated successfully!');
        navigate(`/recipe/${id}`);
      } else {
        const newRecipe = await recipeAPI.createRecipe(formData);
        alert('Recipe created successfully!');
        navigate(`/recipe/${newRecipe.id}`);
      }
    } catch (err) {
      setError(isEditing ? 'Failed to update recipe. Please try again.' : 'Failed to create recipe. Please try again.');
      console.error('Error saving recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  const commonCategories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Appetizer', 'Beverage'];

  if (loading && isEditing && !formData.name) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to recipes
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Recipe' : 'Add New Recipe'}
        </h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Recipe Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${fieldErrors.name ? 'border-red-500' : ''}`}
            placeholder="Enter recipe name"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select a category (optional)</option>
            {commonCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            You can also type a custom category in the field above
          </p>
        </div>

        {/* Custom Category Input */}
        {!commonCategories.includes(formData.category) && (
          <div className="mb-6">
            <label htmlFor="customCategory" className="block text-sm font-medium text-gray-700 mb-2">
              Custom Category
            </label>
            <input
              type="text"
              id="customCategory"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter custom category"
            />
          </div>
        )}

        {/* Ingredients */}
        <div className="mb-6">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
            Ingredients *
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows={6}
            className={`form-textarea ${fieldErrors.ingredients ? 'border-red-500' : ''}`}
            placeholder="List all ingredients (one per line or separated by commas)&#10;Example:&#10;2 cups flour&#10;1 cup sugar&#10;3 eggs"
          />
          {fieldErrors.ingredients && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.ingredients}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            You can separate ingredients with commas or new lines
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
            Instructions *
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={8}
            className={`form-textarea ${fieldErrors.instructions ? 'border-red-500' : ''}`}
            placeholder="Provide step-by-step cooking instructions&#10;Example:&#10;1. Preheat oven to 350°F&#10;2. Mix dry ingredients in a bowl&#10;3. Add wet ingredients and stir until combined"
          />
          {fieldErrors.instructions && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.instructions}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Number your steps or separate them with new lines
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary flex-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isEditing ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              isEditing ? 'Update Recipe' : 'Create Recipe'
            )}
          </button>
          
          <Link
            to={isEditing ? `/recipe/${id}` : '/'}
            className="btn-secondary flex-1 text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm; 