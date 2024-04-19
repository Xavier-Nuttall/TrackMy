const { Pool } = require('pg');
const { readFileSync } = require('fs');
const { parse } = require('ini');

const config = parse(readFileSync('./secrets/secrets.ini', 'utf-8'));
/*
 * Database Connection Pool
 * Allows multiple connections to be used efficiently
 */
const pool = new Pool({
    host: config.database.db_host, 
    user: config.database.db_admin_user,
    password: config.database.db_admin_password,
    database: config.database.db_database,
    port: config.database.port,                // Default port for PostgreSQL
    max: 10,                   // Set the max number of clients in the pool
    idleTimeoutMillis: 30000,  // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000,  // Return an error after 2 seconds if connection cannot be established
});

pool.on('error', (err, client) => {
    console.error('Error with the database connection pool:', err);
});

module.exports = pool;
