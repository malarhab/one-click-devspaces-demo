const { Pool, Client } = require('pg');

const dbName = process.env.POSTGRES_DB || 'todoapp';
const dbUser = process.env.POSTGRES_USER || 'postgres';
const dbPassword = process.env.POSTGRES_PASSWORD || 'password';
const dbHost = process.env.POSTGRES_HOST || 'postgres';
const dbPort = process.env.POSTGRES_PORT || 5432;

const adminConfig = {
    user: dbUser,
    host: dbHost,
    database: 'postgres',
    password: dbPassword,
    port: dbPort,
};

const appConfig = {
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: dbPort,
};

async function initializeDatabase() {
    const client = new Client(adminConfig);
    try {
        await client.connect();
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
        if (res.rowCount === 0) {
            console.log(`Database '${dbName}' not found. Creating it...`);
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log(`Database '${dbName}' created.`);
        } else {
            console.log(`Database '${dbName}' already exists.`);
        }
    } catch (error) {
        console.error('Error creating database:', error);
        process.exit(1);
    } finally {
        await client.end();
    }

    const pool = new Pool(appConfig);
    try {
        console.log(`Connecting to database '${dbName}' to initialize schema...`);
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
        console.log('Table "todos" is ready.');

        console.log('Database setup complete!');

    } catch (error) {
        console.error('Error initializing tables:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

initializeDatabase(); 