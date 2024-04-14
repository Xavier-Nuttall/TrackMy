const { Pool } = require('pg');

/*
 * Database Connection Pool
 * Allows multiple connections to be used efficiently
 */
const pool = new Pool({
    host: 'localhost', 
    user: 'info310',
    password: 'password',
    database: 'trackmy',
    port: 5432,                // Default port for PostgreSQL
    max: 10,                   // Set the max number of clients in the pool
    idleTimeoutMillis: 30000,  // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000,  // Return an error after 2 seconds if connection cannot be established
});

pool.on('error', (err, client) => {
    console.error('Error with the database connection pool:', err);
});

module.exports = pool;
