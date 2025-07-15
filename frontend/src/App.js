import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import './index.css';

// Navigation component
const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold hover:text-blue-200 transition-colors">
              🍳 My Digital Recipe Box
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              All Recipes
            </Link>
            <Link
              to="/add"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/add'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              Add Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/add" element={<RecipeForm />} />
            <Route path="/edit/:id" element={<RecipeForm />} />
            <Route path="*" element={
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-600">Page Not Found</h2>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                  Go back to recipes
                </Link>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 