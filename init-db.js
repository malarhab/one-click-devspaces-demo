const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'secret_app',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Create secrets table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS secrets (
        id SERIAL PRIMARY KEY,
        password_hash VARCHAR(255) NOT NULL,
        secret_phrase TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Check if there's already a secret configured
    const existingSecret = await pool.query('SELECT id FROM secrets WHERE id = 1');
    
    if (existingSecret.rows.length === 0) {
      // Hash the default password
      const defaultPassword = 'mysecretpassword123'; // Change this to your desired password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);
      
      // Insert default secret
      await pool.query(`
        INSERT INTO secrets (id, password_hash, secret_phrase)
        VALUES (1, $1, $2)
      `, [hashedPassword, 'The secret phrase is: "Welcome to the hidden world of secrets! 🔐"']);
      
      console.log('✓ Database initialized successfully!');
      console.log('✓ Default password: mysecretpassword123');
      console.log('✓ Secret phrase configured');
    } else {
      console.log('✓ Database already initialized');
    }
    
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the initialization
initializeDatabase(); 