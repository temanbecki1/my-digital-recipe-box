#!/usr/bin/env node

/**
 * Database Migration Script
 * Run this script to manually set up your database schema and sample data
 * 
 * Usage: node scripts/migrate.js
 */

const initializeDatabase = require('../config/init-db');

console.log('🔄 Starting database migration...');

const runMigration = async () => {
  try {
    await initializeDatabase();
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run the migration
runMigration(); 