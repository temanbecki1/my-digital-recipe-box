Development Roadmap: My Digital Recipe Box
This roadmap outlines the key phases and tasks for building and deploying the "My Digital Recipe Box" full-stack CRUD application.
Phase 1: Project Setup & Core Backend (Node.js/Express & PostgreSQL)
Goal: Establish the project structure and create a functional API that interacts with a PostgreSQL database.
Task 1.1: Initialize Project & Git Repository
Create a new project directory.
Initialize a Git repository (git init).
Create a .gitignore file (e.g., for node_modules, .env).
Set up initial README.md with project description.
Task 1.2: Set Up Express.js Backend
Initialize Node.js project (npm init -y or yarn init -y).
Install core dependencies: express, pg, cors, dotenv (for local environment variables).
Create server.js (or app.js) for the Express server.
Implement basic server setup (port, CORS middleware).
Task 1.3: Database Schema & Migration (Conceptual for Video)
Define the recipes table schema (id, name, ingredients, instructions, category, created_at, updated_at).
Note for video: Explain that in a real project, you'd use a migration tool (like Knex.js or Sequelize). For this tutorial, we'll manually create the table in Railway's PostgreSQL console or provide the SQL.
Task 1.4: Implement Backend API Endpoints (CRUD)
Create Database Connection: Set up pg.Pool using environment variables.
GET /api/recipes: Fetch all recipes.
GET /api/recipes/:id: Fetch a single recipe.
POST /api/recipes: Add a new recipe.
PUT /api/recipes/:id: Update an existing recipe.
DELETE /api/recipes/:id: Delete a recipe.
Implement basic error handling for API routes.
Task 1.5: Local Backend Testing
Use tools like Postman or Insomnia, or curl, to test all API endpoints.
Ensure data can be successfully created, read, updated, and deleted in a local PostgreSQL instance (or a temporary remote one).
Phase 2: Core Frontend (React & Tailwind CSS)
Goal: Build the user interface for the application, styled with Tailwind CSS.
Task 2.1: Create React Application
Use Create React App (npx create-react-app client --template cra-template-pwa) or Vite (npm create vite@latest client -- --template react) for a quick start.
Clean up boilerplate code.
Task 2.2: Integrate Tailwind CSS
Follow Tailwind CSS installation guide for React (e.g., npx tailwindcss init -p).
Configure tailwind.config.js to scan React files.
Add Tailwind directives to index.css.
Task 2.3: Develop Core React Components
App.js: Main layout, potentially including navigation.
RecipeList.js:
Fetch all recipes from the backend API.
Display recipes in a list/card format.
Add "View Details," "Edit," and "Delete" buttons for each recipe.
RecipeForm.js:
Form for name, ingredients, instructions, category.
Handle form submission for adding new recipes (POST).
Populate form for editing existing recipes (GET by ID, then PUT).
RecipeDetail.js: Display full details of a selected recipe.
Task 2.4: Implement Frontend API Integration
Install axios (or use built-in fetch).
Connect RecipeList to GET /api/recipes.
Connect RecipeForm to POST /api/recipes and PUT /api/recipes/:id.
Connect RecipeDetail to GET /api/recipes/:id.
Implement delete functionality (DELETE /api/recipes/:id).
Task 2.5: Local Frontend Testing
Run the React app locally (npm start).
Verify all CRUD operations work correctly against the locally running Express backend.
Ensure UI updates correctly after operations.
Phase 3: Integration & Local Testing
Goal: Ensure the frontend and backend communicate seamlessly in a local environment.
Task 3.1: Configure Frontend API URL
Set up a .env file in the React project (e.g., REACT_APP_API_URL=http://localhost:5000 assuming backend runs on port 5000).
Task 3.2: Run Both Services Locally
Start the Express backend.
Start the React frontend.
Thoroughly test all CRUD functionalities, ensuring data persistence through the backend to the database.
Phase 4: Deployment to Railway
Goal: Deploy the full-stack application to Railway.
Task 4.1: Prepare GitHub Repository
Ensure all code (frontend and backend) is pushed to a single GitHub repository.
Verify .gitignore is correctly configured.
Add start scripts to package.json for both frontend and backend if not already present, so Railway can run them.
Task 4.2: Provision PostgreSQL on Railway
Log in to Railway.
Create a new project.
Add a new service: "Database" -> "PostgreSQL".
Note: Explain how Railway provides environment variables for database connection.
Task 4.3: Deploy Express Backend to Railway
Add a new service: "Deploy from GitHub Repo."
Select the repository.
Railway should auto-detect Node.js.
Verify environment variables for database connection are automatically injected.
Monitor build logs for successful deployment.
Task 4.4: Deploy React Frontend to Railway
Add another new service from the same GitHub repository.
Configure build command (e.g., npm run build or yarn build).
Configure start command (e.g., serve -s build if using serve package, or a simple Express static server for the build folder).
Crucial: Add an environment variable (e.g., REACT_APP_API_URL) to the React service, pointing to the public URL of the deployed Express backend service on Railway.
Monitor build logs.
Task 4.5: Live Application Testing
Access the deployed React frontend URL.
Perform all CRUD operations to confirm the entire stack is working end-to-end on Railway.
Demonstrate automatic redeployment on Git push.
Phase 5: Enhancements & Refinements (Optional / Future Ideas)
Goal: Improve the application beyond core functionality.
Task 5.1: Basic Input Validation (Frontend)
Add simple client-side validation to the RecipeForm.
Task 5.2: User Feedback (Frontend)
Implement loading states, success messages, and error notifications.
Task 5.3: Basic Styling Improvements
Add more sophisticated Tailwind CSS styles for a polished look.
Task 5.4: Search/Filter Functionality
Add a search bar or category filters to RecipeList.
Task 5.5: Responsive Design
Ensure the application looks good on various screen sizes using Tailwind's responsive utilities.
