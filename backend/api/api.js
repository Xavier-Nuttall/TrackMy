const express = require('express');
const pool = require('./db');
const router = express.Router();
const { WebSocket } = require('ws');
// // Create a WebSocket connection outside of route handlers

let ws;
// let ws = new WebSocket('ws://localhost:8081');
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
    res.status(200).send('');
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
    try {
        const queryResult = await pool.query(`
            SELECT t.room_id, t.time, t.occupancy
            FROM tracking.RoomTime t;
        `);
        res.status(200).send(queryResult[0]);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// get information about a specific room
router.get('/rooms/:id/', async (req, res) => {
    try {
        const queryResult = await pool.query(`
    SELECT r.room_id, r.room_name, r.threshold
    FROM tracking.Room r
    WHERE r.room_id = $1;
`, [req.params.id]);
        if (queryResult[0].length === 0) {
            res.status(404).send("Room not found");
        }
        res.status(200).send(queryResult[0]);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});



// get occupancy of a specific room
router.get('/rooms/:id/occupancy/', async (req, res) => {
    try {
        const queryResult = await pool.query(`
        SELECT t.time, t.occupancy
        FROM tracking.RoomTime t
        WHERE t.room_id = $1;
    `, [req.params.id]);
        if (queryResult[0].length === 0) {
            res.status(404).send("Room not found");
        }
        res.status(200).send(queryResult[0]);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});



// post information about room occupancy
router.post('/rooms/occupancy/', async (req, res) => {
    
    try {
        // check the post message for the correct fields
        
        // sends out the data to the websocket
        // if ws is not attempted wait 
        if (ws.readyState !== WebSocket.OPEN) {
            res.status(500).send("Internal Server Error");
            return;
        }

        ws.send(JSON.stringify({ type: "update", data: req.body }));
        
        // adds the data to the database.


        res.status(204).send('');
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router; 