const express = require('express');
const pool = require('./db');
const router = express.Router();
const { WebSocket } = require('ws');
// // Create a WebSocket connection outside of route handlers

let ws;

connect();

function connect() {
    console.log('Attempting WebSocket connection')
    ws = new WebSocket('ws://localhost:8081');
    ws.on('open', () => {
        console.log('WebSocket connection established');
    });

    ws.on('message', (data) => {
        console.log('Received:', data);
    });

    ws.onclose = () => {
        console.log('Attempting Reconnect');
        setTimeout(connect, 2000);
    };
    ws.onerror = (error) => {
        console.error(`WebSocket error: ${error}`);
        ws.terminate();
    }
}

router.get('/', async (req, res) => {
    console.log('api hit');
});

// returns information about the rooms
router.get('/rooms/', async (req, res) => {

    try {
        const queryResult = await pool.query(`
            SELECT r.room_id, r.room_name, r.threshold
            FROM tracking.Room r;
        
        `);

        // Respond to the client with a success message
        res.status(200).send(queryResult[0]);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/rooms/occupancy/', async (req, res) => {

});

// get information about a specific room
router.get('/rooms/:id/', async (req, res) => {
    const queryResult = await pool.query(`
    SELECT r.room_id, r.room_name, r.threshold
    FROM tracking.Room r
    WHERE r.room_id = $1;
`, [req.params.id]);
});



// get occupancy of a specific room
router.get('/rooms/:id/occupancy/', async (req, res) => {

    const queryResult = await pool.query(`
    SELECT t.time, t.occupancy
    FROM tracking.RoomTime t
    WHERE t.room_id = $1;
`, [req.params.id]);
});



// post information about room occupancy
router.post('/rooms/occupancy/', async (req, res) => {
    // sends out the data to the websocket
    ws.send(JSON.stringify({type: "update", data: req.body}));

    // adds the data to the database.
    try {
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router; 