const { Pool } = require('pg');

// Debug database configuration
console.log('🔍 Database Configuration:');
console.log('PGUSER:', process.env.PGUSER ? '✅ Set' : '❌ Missing');
console.log('PGHOST:', process.env.PGHOST ? '✅ Set' : '❌ Missing');
console.log('PGDATABASE:', process.env.PGDATABASE ? '✅ Set' : '❌ Missing');
console.log('PGPASSWORD:', process.env.PGPASSWORD ? '✅ Set' : '❌ Missing');
console.log('PGPORT:', process.env.PGPORT ? '✅ Set' : '❌ Missing');
console.log('NODE_ENV:', process.env.NODE_ENV);

// Database configuration
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool; 