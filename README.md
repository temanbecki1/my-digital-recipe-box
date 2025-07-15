# My Digital Recipe Box 🍳

A full-stack CRUD application for storing, managing, and sharing your favorite recipes. Built with React, Node.js, Express, and PostgreSQL, designed for easy deployment on Railway.

## 🚀 Features

- **Create Recipes**: Add new recipes with ingredients, instructions, and categories
- **View Recipes**: Browse all recipes in a responsive grid layout
- **Edit Recipes**: Update existing recipes with ease
- **Delete Recipes**: Remove recipes you no longer need
- **Search & Filter**: Find recipes by name, ingredients, or category
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework for building RESTful APIs
- **PostgreSQL** - Database for storing recipes
- **pg** - PostgreSQL client for Node.js
- **CORS** - Cross-Origin Resource Sharing middleware

### Frontend
- **React** - UI library for building user interfaces
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework

### Deployment
- **Railway** - Cloud platform for database and application hosting

## 📁 Project Structure

```
my-digital-recipe-box/
├── backend/                  # Express.js API server
│   ├── config/
│   │   └── database.js      # PostgreSQL connection configuration
│   ├── database/
│   │   └── schema.sql       # Database schema and sample data
│   ├── routes/
│   │   └── recipes.js       # Recipe CRUD API endpoints
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server entry point
├── frontend/                # React application
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── RecipeList.js
│   │   │   ├── RecipeDetail.js
│   │   │   └── RecipeForm.js
│   │   ├── services/
│   │   │   └── api.js       # API service functions
│   │   ├── App.js           # Main App component with routing
│   │   ├── index.js         # React app entry point
│   │   └── index.css        # Tailwind CSS styles
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS configuration
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (local or Railway)

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd my-digital-recipe-box
```

#### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# PostgreSQL Database Configuration
PGUSER=your_database_user
PGHOST=your_database_host
PGDATABASE=your_database_name
PGPASSWORD=your_database_password
PGPORT=5432

# Application Configuration
PORT=5000
NODE_ENV=development
```

#### 3. Set Up the Database

Create the database table by running the SQL in `backend/database/schema.sql` in your PostgreSQL database.

#### 4. Start the Backend Server

```bash
npm run dev  # or npm start
```

The backend API will be available at `http://localhost:5000`

#### 5. Set Up the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

#### 6. Start the Frontend Development Server

```bash
npm start
```

The React app will be available at `http://localhost:3000`

## 🚀 Deployment to Railway

### Step 1: Prepare Your Repository

1. Ensure all code is committed to a GitHub repository
2. Make sure your `.gitignore` is properly configured

### Step 2: Set Up PostgreSQL Database

1. Log in to [Railway](https://railway.app)
2. Create a new project
3. Add a new service: "Database" → "PostgreSQL"
4. Railway will automatically provide environment variables for database connection
5. Connect to your database and run the SQL from `backend/database/schema.sql`

### Step 3: Deploy the Backend

1. In your Railway project, add a new service: "Deploy from GitHub Repo"
2. Select your repository
3. Configure the service:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Railway will automatically inject database environment variables
5. Note the deployed backend URL (e.g., `https://your-backend.railway.app`)

### Step 4: Deploy the Frontend

1. Add another service to your Railway project
2. Select the same GitHub repository
3. Configure the service:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npx serve -s build -l 3000`
4. Add environment variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: Your backend URL from Step 3
5. Deploy the service

### Step 5: Test Your Deployment

1. Access your deployed frontend URL
2. Test all CRUD operations to ensure the full stack is working
3. Verify automatic redeployment by pushing changes to GitHub

## 📖 API Documentation

### Base URL
- Local: `http://localhost:5000/api`
- Production: `https://your-backend.railway.app/api`

### Endpoints

#### Get All Recipes
```
GET /recipes
```

#### Get Single Recipe
```
GET /recipes/:id
```

#### Create Recipe
```
POST /recipes
Content-Type: application/json

{
  "name": "Recipe Name",
  "ingredients": "Ingredient list",
  "instructions": "Step by step instructions",
  "category": "Category (optional)"
}
```

#### Update Recipe
```
PUT /recipes/:id
Content-Type: application/json

{
  "name": "Updated Recipe Name",
  "ingredients": "Updated ingredient list",
  "instructions": "Updated instructions",
  "category": "Updated category"
}
```

#### Delete Recipe
```
DELETE /recipes/:id
```

## 🎨 Customization

### Adding New Features

1. **Search Enhancement**: Modify the search functionality in `RecipeList.js`
2. **Recipe Images**: Add image upload functionality
3. **User Authentication**: Implement user accounts and recipe ownership
4. **Recipe Sharing**: Add social sharing features

### Styling

The application uses Tailwind CSS for styling. Custom styles are defined in `frontend/src/index.css`. Modify these styles or add new ones to customize the appearance.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify your PostgreSQL credentials
   - Ensure the database exists and is accessible
   - Check Railway environment variables

2. **CORS Errors**
   - Verify the frontend URL is correctly configured in CORS settings
   - Check that `REACT_APP_API_URL` points to the correct backend URL

3. **Build Failures**
   - Ensure all dependencies are properly listed in `package.json`
   - Check for syntax errors in your code
   - Verify Node.js version compatibility

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Built following the development roadmap for full-stack CRUD applications
- Styled with Tailwind CSS for rapid development
- Deployed using Railway's seamless deployment platform 