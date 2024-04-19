const express = require('express');
const pool = require('./db');
const WebSocket = require('ws');
const router = express.Router();


// Create a WebSocket connection outside of route handlers
const ws = new WebSocket('ws://localhost:8081/');

router.get('/', async (req, res) => {
    console.log('api hit');
    res.redirect('/api/heatmap-data');
});

router.get('/heatmap-data/', async (req, res) => {

    try {
        // Query data from the PostgreSQL database using pool.query
        const queryResult = await pool.query(`
            SELECT r.room_name, r.threshold, rt.occupancy
            FROM tracking.Room r
            JOIN (
                SELECT room_id, occupancy
                FROM tracking.RoomTime
                ORDER BY date DESC, time DESC
                LIMIT 1
            ) rt ON r.room_id = rt.room_id;
            `);


        let obj = {
            message: 'print',
            data: JSON.stringify(queryResult.rows)
        }
        // Send data through WebSocket
        ws.send(JSON.stringify(obj));

        // Respond to the client with a success message
        res.status(200).send({message : 'Data sent through WebSocket.'});
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/heatmap-update/', async (req, res) => {
    // Get the JSON string from the object keys
    const jsonString = Object.keys(req.body)[0];

    // Parse the JSON string to extract the data
    const parsedData = JSON.parse(jsonString);

    // Access the properties of the parsed data
    const room_id = parsedData.room_id; // 1
    const change = parsedData.change; // -1
    const date = parsedData.date; // "2024-04-20"
    const time = parsedData.time; // "12:00:00"
    //console.log(room_id + " " + change + " " + date + " " + time);
    try {

        const queryResult = await pool.query(`
                SELECT rt.occupancy
                FROM tracking.Room r
                JOIN (
                    SELECT room_id, occupancy
                    FROM tracking.RoomTime
                    ORDER BY date DESC, time DESC
                    LIMIT 1
                ) rt ON r.room_id = rt.room_id;
            `);

        //console.log(queryResult.rows);
        //console.log(queryResult.rows.length);

        let occupancyValue;
        if (queryResult.rows.length > 0) {
            occupancyValue = parseInt(queryResult.rows[0].occupancy) + parseInt(change);
        } else {
            //console.log('not good');
            occupancyValue = 1;
        }

        if(occupancyValue >= 0){

        
        // Query data from the PostgreSQL database using pool.query
        const query = `
        INSERT INTO tracking.RoomTime (room_id, occupancy, time, date)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (room_id, time, date)
        DO UPDATE SET
            occupancy = EXCLUDED.occupancy
        `;

        const sendQuery = await pool.query(query, [room_id, parseInt(occupancyValue), time, date]);
        }

        res.redirect('/api/heatmap-data/');
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router; 