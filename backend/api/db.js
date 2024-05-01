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

async function getRooms() {
    const ret = await pool.query(`
        SELECT r.room_id, r.room_name, r.threshold
        FROM tracking.Room r;
    `);
    
    return ret.rows;
}

async function getOccupancy() {
    const ret = await pool.query(`
        SELECT t.room_id, t.time, t.occupancy
        FROM tracking.RoomTime t;
    `);
    
    return ret.rows;
}

async function getRoomById(room_id) {
    const ret = await pool.query(`
        SELECT r.room_id, r.room_name, r.threshold
        FROM tracking.Room r
        WHERE r.room_id = $1;
    `, [room_id]);
    return ret.rows[0];
}

async function getOccupancyByRoomId(room_id) {
    const ret = await pool.query(`
        SELECT t.time, t.occupancy as value
        FROM tracking.RoomTime t
        WHERE t.room_id = $1;
    `, [room_id]);
    return ret.rows;
}


async function addRoom(room_name, threshold) {
    const ret = await pool.query(`
        INSERT INTO tracking.Room (room_name, threshold)
        VALUES ($1, $2)
        RETURNING room_id;
    `, [room_name, threshold]);
    return ret.rows[0];
}

async function addOccupancy(room_id, time, occupancy) {
    time /= 1000;
    const res = pool.query(`
        INSERT INTO tracking.RoomTime (room_id, time, occupancy)
        VALUES ($1, to_timestamp($2), $3);
    `, [room_id, time, occupancy]);
    return true;
}

async function getNotifications() {
    const res = pool.query(`
        SELECT ut.user_id, ut.room_id, ut.room_threshold, ut.start_time, ut.end_time
        FROM tracking.UserTimes ut;
    `);
    return res.rows;
}

async function addNotification(user_id, room_id, room_threshold, start_time, end_time) {
    const res = pool.query(`
        INSERT INTO tracking.UserTimes (user_id, room_id, room_threshold, start_time, end_time)
        VALUES ($1, $2, $3, $4, $5);
    `, [user_id, room_id, room_threshold, start_time, end_time]);
    return false;;
}

async function removeNotification(user_id, room_id) {
    const res = pool.query(`
        DELETE FROM tracking.UserTimes
        WHERE user_id = $1 AND room_id = $2;
    `, [user_id, room_id]);
    return true;
}


const dao = {
    getRooms,
    getOccupancy,
    getRoomById,
    getOccupancyByRoomId,
    addRoom,
    addOccupancy,
    getNotifications,
    addNotification,
    removeNotification,
};

module.exports = dao;
