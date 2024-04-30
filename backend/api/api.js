const express = require('express');
const pool = require('./db');
const router = express.Router();
const { WebSocket } = require('ws');
const Ajv = require("ajv")


const ajv = new Ajv();
const schemaRoomtime = {
    type: "object",
    properties: {
        room_id: { type: "number" },
        time: { type: "string" },
        occupancy: { type: "number" }
    },
    required: ["room_id", "time", "occupancy"],
    additionalProperties: false
}

const schemaUsertime = {
    type: "object",
    properties: {
        user_id: { type: "number" },
        room_id: { type: "number" },
        room_threshold: { type: "number" },
        start_time: { type: "string" },
        end_time: { type: "string" }
    },
    required: ["user_id", "room_id", "room_threshold", "start_time", "end-time"],
    additionalProperties: false
}

const validateRoomtime = ajv.compile(schemaRoomtime);
const validateUsertime = ajv.compile(schemaUsertime);

// // Create a WebSocket connection outside of route handlers

let ws;
// let ws = new WebSocket('ws://localhost:8081');


function connect() {
    console.log('Attempting WebSocket connection...')
    ws = new WebSocket('ws://localhost:8081');
    ws.on('open', () => {
        console.log('WebSocket connection established');
    });

    ws.on('message', (data) => {
        let obj;
        try {
            obj = JSON.parse(data);
        } catch (error) {
            console.warn("Invalid JSON", error);
        }
        console.log('Received Message:', JSON.stringify(obj));
    });

    ws.onclose = () => {
        console.log('WebSocket connection closed');
        console.log('Attempting Reconnect');
        setTimeout(connect, 2000);
    };
    ws.onerror = (error) => {
        console.error(`WebSocket error: ${error}`);
        ws.close();
    }
}

connect();

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
        res.status(200).send(queryResult.rows);
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


        // reduce the return from the database into something more readable
        let returnArray = [];
        for (l in queryResult.rows) {
            obj = queryResult.rows[l];
            console.log(obj);
            if (!returnArray[obj.room_id]) {
                returnArray[obj.room_id] = { room_id: obj.room_id, occupancy: [] };
            }
            returnArray[obj.room_id].occupancy.push({ time: obj.time, value: obj.occupancy });
        }
        res.status(200).send(returnArray);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }
});

// get information about a specific room
router.get('/rooms/:id/', async (req, res) => {
    try {
        const queryResult = await pool.query(`
            SELECT r.room_id, r.room_name, r.threshold
            FROM tracking.Room r
            WHERE r.room_id = $1 LIMIT 1;
        `, [req.params.id]);
        if (queryResult.rows.length === 0) {
            res.status(404).send("Room not found");
            return;
        }
        res.status(200).send(queryResult.rows[0]);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});



// get occupancy of a specific room
router.get('/rooms/:id/occupancy/', async (req, res) => {
    try {
        const queryResult = await pool.query(`
        SELECT t.time, t.occupancy as value
        FROM tracking.RoomTime t
        WHERE t.room_id = $1;
    `, [req.params.id]);
        if (queryResult.rows.length === 0) {
            res.status(404).send("Room not found");
            return;
        }
        res.status(200).send(queryResult.rows);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});



// post information about room occupancy
router.post('/rooms/occupancy/', async (req, res) => {

    try {
        const obj = req.body;
        // check the post message for the correct fields
        if (!validateRoomtime(obj)) {
            res.status(400).send("Bad Request");
            return;
        }
        
        // sends out the data to the websocket
        // if ws is not attempted wait 
        if (ws.readyState !== WebSocket.OPEN) {
            res.status(500).send("Internal Server Error");
            return;
        }

        ws.send(JSON.stringify({ type: "update", data: obj }));

        // adds the data to the database.

        const queryResult = await pool.query(`
            INSERT INTO tracking.RoomTime (room_id, time, occupancy)
            VALUES ($1, $2, $3);
        `, [obj.room_id, obj.time, obj.occupancy]);

        // if the query failed send an error message

        res.status(204).send('');
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }

});



module.exports = router; 