#!/usr/bin/env node

/**
 * Database Reset Script
 * Run this script to drop and recreate your database with fresh sample data
 * 
 * Usage: node scripts/reset-db.js
 */

const pool = require('../config/database');
const initializeDatabase = require('../config/init-db');

console.log('🔄 Starting database reset...');

const resetDatabase = async () => {
  try {
    console.log('🗑️  Dropping existing recipes table...');
    
    // Drop the recipes table
    await pool.query('DROP TABLE IF EXISTS recipes CASCADE');
    
    console.log('✅ Table dropped successfully');
    
    // Reinitialize the database
    await initializeDatabase();
    
    console.log('✅ Database reset completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    process.exit(1);
  }
};

// Run the reset
resetDatabase(); 