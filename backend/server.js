const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const initializeDatabase = require('./config/init-db');
const pool = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'My Digital Recipe Box API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Database health check route
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// API routes will be added here
app.use('/api/recipes', require('./routes/recipes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database schema and sample data
    await initializeDatabase();
    
    // Start the server
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    console.error('🔍 Common causes:');
    console.error('  • PostgreSQL service not running on Railway');
    console.error('  • Database environment variables not set');
    console.error('  • Services not connected in Railway dashboard');
    
    // In production, wait before retrying instead of immediate exit
    if (process.env.NODE_ENV === 'production') {
      console.log('⏳ Waiting 30 seconds before retry...');
      setTimeout(() => {
        console.log('🔄 Retrying server startup...');
        startServer();
      }, 30000);
    } else {
      process.exit(1);
    }
  }
};

// Start the server
startServer(); 