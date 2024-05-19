const { Pool } = require('pg');
const { readFileSync } = require('fs');
const { parse } = require('ini');
const { v4: uuidv4 } = require('uuid');
const { callMsGraph } = require('./graph.js');


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
    const res = await pool.query(`
        INSERT INTO tracking.RoomTime (room_id, time, occupancy)
        VALUES ($1, to_timestamp($2), $3);
    `, [room_id, time, occupancy]);
    return true;
}

async function getNotifications() {
    const res = await pool.query(`
        SELECT ut.user_id, ut.room_id, ut.room_threshold, ut.start_time, ut.end_time
        FROM tracking.UserTimes ut;
    `);
    return res.rows;
}

async function getNotificationsByID(userId) {
    const res = await pool.query(`
        SELECT ut.user_id, ut.room_id, ut.room_threshold, ut.start_time, ut.end_time
        FROM tracking.UserTimes ut WHERE ut.user_id = $1;
    `, [userId]);
    return res.rows;
}

async function addNotification(user_id, room_id, room_threshold, start_time, end_time) {
    const res = await pool.query(`
        INSERT INTO tracking.UserTimes (user_id, room_id, room_threshold, start_time, end_time)
        VALUES ($1, $2, $3, $4, $5);
    `, [user_id, room_id, room_threshold, start_time, end_time]);
    return false;;
}

async function removeNotification(user_id, room_id) {
    const res = await pool.query(`
        DELETE FROM tracking.UserTimes
        WHERE user_id = $1 AND room_id = $2;
    `, [user_id, room_id]);
    return true;
}

async function addUser(accessToken) {
    let email;
    let firstName;
    let lastName;

    // make call on behalf of user to get email and name information
    return callMsGraph(accessToken).then(async (data) => {
        email = data.mail;
        firstName = data.givenName;
        lastName = data.surname;

        // The getUserByEmail function is called to check if the user already exists in the system.
        let user = getUserByEmail(email);

        // The promise returned by getUserByEmail is handled here.
        return user.then((reponse) => {
            // If the user already exists, a new session is created for them.
            if (reponse != undefined) {
                // The promise returned by addSession is handled here.
                session = addSession(reponse.user_id);
                return session.then((session) => {
                    // The function returns an object containing the user's first name, last name, email, session token, and user ID.
                    return { firstName: user.firstName, lastName: user.lastName, email: email, session_token: session, user_id: reponse.user_id };
                });

                // If the user does not exist, a new user ID is generated for them.
            } else {
                user_id = uuidv4();
                const res = pool.query(`INSERT INTO pii.User (email_address, firstname, lastname, user_id) VALUES ($1, $2, $3, $4);`, [email, firstName, lastName, user_id]);

                // When the query is successful, a new session is created for the user.
                return res.then((data) => {
                    session = addSession(user_id);
                    return session.then((sessionToken) => {
                        return { firstName, lastName, email, session_token: sessionToken, user_id: user_id };
                    });
                }).catch((err) => {
                    console.log("error in adding user" + err);
                    throw err;
                });

            }
        });

    }).catch((err) => {
        console.log("error in ms graph call" + err);
        throw err;
    });
}

async function addSession(user_id) {
    const session_id = uuidv4();
    const res = await pool.query(`
        INSERT INTO pii.login (session_token, user_id)
        VALUES ($1, $2);
    `, [session_id, user_id]);
    return session_id;
}

async function deleteSessionByUser(user_token) {
    const res = await pool.query(`
        DELETE FROM pii.login 
        WHERE user_token = $1 RETURNING user_id LIMIT 1;
    `, [user_token]);
    return res.rows[0];
}

async function getUserByEmail(email_address) {
    const res = await pool.query(`
        SELECT user_id, email_address, firstname, lastname
        FROM pii.user
        WHERE email_address = $1 LIMIT 1;
    `, [email_address]);
    return res.rows[0];

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
    addUser,
    deleteSessionByUser,
    getUserBySession,
    getNotificationsByID
};

module.exports = dao;
