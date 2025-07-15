import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Recipe API functions
export const recipeAPI = {
  // Get all recipes
  getAllRecipes: async () => {
    try {
      const response = await api.get('/api/recipes');
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  // Get single recipe by ID
  getRecipe: async (id) => {
    try {
      const response = await api.get(`/api/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  },

  // Create new recipe
  createRecipe: async (recipeData) => {
    try {
      const response = await api.post('/api/recipes', recipeData);
      return response.data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  },

  // Update existing recipe
  updateRecipe: async (id, recipeData) => {
    try {
      const response = await api.put(`/api/recipes/${id}`, recipeData);
      return response.data;
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  },

  // Delete recipe
  deleteRecipe: async (id) => {
    try {
      const response = await api.delete(`/api/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  },
};

export default api; 