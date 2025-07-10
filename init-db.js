const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres',
  database: process.env.POSTGRES_DB || 'todoapp',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: process.env.POSTGRES_PORT || 5432,
});

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Create the todos table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await pool.query(createTableQuery);
    console.log('Database initialized successfully!');
    
    // Insert some sample data
    const sampleTodos = [
      { text: 'Learn Node.js', completed: false },
      { text: 'Build a to-do app', completed: false },
      { text: 'Deploy to OpenShift', completed: false }
    ];
    
    for (const todo of sampleTodos) {
      const checkQuery = 'SELECT COUNT(*) FROM todos WHERE text = $1';
      const result = await pool.query(checkQuery, [todo.text]);
      
      if (parseInt(result.rows[0].count) === 0) {
        const insertQuery = 'INSERT INTO todos (text, completed) VALUES ($1, $2)';
        await pool.query(insertQuery, [todo.text, todo.completed]);
        console.log(`Added sample todo: ${todo.text}`);
      }
    }
    
    console.log('Database setup complete!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

// Run the initialization
initializeDatabase(); 