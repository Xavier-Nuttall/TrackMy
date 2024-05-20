const express = require('express');
const dao = process.argv[2] == 'false' ? require('../../test/mock_db') : require('./db');
const router = express.Router();
const { WebSocket } = require('ws');
const Ajv = require("ajv")

const sessionUserMap = new Map();
const userSessionMap = new Map();

const ajv = new Ajv();
const schemaRoomtime = {
    type: "object",
    properties: {
        room_id: { type: "number" },
        time: { type: "number" },
        occupancy: { type: "number" }
    },
    required: ["room_id", "time", "occupancy"],
    additionalProperties: false
}

const schemaRoom = {
    type: "object",
    properties: {
        room_name: { type: "string" },
        threshold: { type: "number" }
    },
    required: ["room_name", "threshold"],
    additionalProperties: false
}

const validateRoom = ajv.compile(schemaRoom);
const schemaUsertime = {
    type: "object",
    properties: {
        user_id: { type: "string" },
        room_id: { type: "number" },
        room_threshold: { type: "number" },
        start_time: { type: "string" },
        end_time: { type: "string" }
    },
    required: ["user_id", "room_id", "room_threshold", "start_time", "end_time"],
    additionalProperties: false
}

const schemaUser = {
    type: "object",
    properties: {
        email: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        idToken: { type: "string" },
    },
    required: ["email", "firstName", "lastName", "idToken"],
    additionalProperties: false
}

const schemaSession = {
    type: "object",
    properties: {
        user_id: { type: "string" },
    },
    required: ["user_id"],
    additionalProperties: false
}

const validateRoomtime = ajv.compile(schemaRoomtime);
const validateUsertime = ajv.compile(schemaUsertime);
const validateUser = ajv.compile(schemaUser);
const validateSession = ajv.compile(schemaSession);
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
        // console.log('Received Message:', JSON.stringify(obj));
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

    const result = dao.getRooms();

    result.then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send("Internal Server Error");
    })
});

router.get('/notif/emails/', async (req, res) => {
    try {
        const result = await dao.getNotifEmails(); // Assuming dao.getNotifEmails() returns a Promise

        if (!result) {
            res.status(404).send("Email details not found");
            return;
        }

        res.status(200).json(result);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching email details:', error);
        res.status(500).send("Internal Server Error");
    }
});

const offset = 1000 * 60 * 60 * 12;
router.get('/rooms/occupancy/', async (req, res) => {
    const result = dao.getOccupancy();

    result.then((data) => {
        // reduce the return from the dao into something more readable
        let returnArray = [];
        for (l in data) {
            obj = data[l];
            if (!returnArray[obj.room_id]) {
                returnArray[obj.room_id] = { room_id: obj.room_id, occupancy: [] };
            }
            time = (Date.parse(obj.time) + offset);
            // console.log(time);
            returnArray[obj.room_id].occupancy.push({ time: new Date(time), value: obj.occupancy });
        }
        res.status(200).send(returnArray);



    }).catch((err) => {
        console.error('Error:', err);
        res.status(500).send("Internal Server Error");
    });
});

// get information about a specific room
router.get('/rooms/:id/', async (req, res) => {
    const result = dao.getRoomById(req.params.id);
    result.then((data) => {
        if (data.length === 0) {
            res.status(404).send("Room not found");
            return;
        }
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send("Internal Server Error");
    });
});



// get occupancy of a specific room
router.get('/rooms/:id/occupancy/', async (req, res) => {
    const result = dao.getOccupancyByRoomId(req.params.id);
    result.then((data) => {
        if (data.length === 0) {
            res.status(404).send("Room not found");
            return;
        }
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send("Internal Server Error");
    });
});



// post information about room occupancy
router.post('/rooms/occupancy/', async (req, res) => {

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

    const result = dao.addOccupancy(obj.room_id, obj.time, obj.occupancy);
    result.then((data) => {
        if (data) {
            ws.send(JSON.stringify({ type: "update", data: obj }));
            res.status(204).send('');
        } else {
            res.status(400).send("Internal Server Error");
        }
    }).catch((err) => {
        res.status(500).send("Internal Server Error");
    });

    // adds the data to the dao.


    // if the query failed send an error message


});

router.post('/rooms/', async (req, res) => {
    const obj = req.body;
    if (!validateRoom(obj)) {
        console.error("Failed to create room")
        res.status(400).send("Bad Request");
        return;
    }
    const result = dao.addRoom(obj.room_name, obj.threshold);

    result.then((data) => {

        res.status(201).send(data);
    }).catch((err) => {
        res.status(500).send("Internal Server Error");
    });
});

router.post('/users/', async (req, res) => {
    try {
        const obj = req.body;
        // validate
        if (!validateUser(obj)) {
            res.status(400).send("Bad Request");
            return;
        }

        const result = dao.addUser(obj.email, obj.firstName, obj.lastName, obj.email);

        result.then((data) => {
            sessionUserMap.set(data.session_token, data.user_id);
            if (userSessionMap.get(data.user_id) == undefined) {
                userSessionMap.set(data.user_id, []);
            }
            userSessionMap.get(data.user_id).push(data.session_token);
            res.status(201).send({ session_token: data.session_token });
        }).catch((err) => {
            if (err.code === '23505') {
                res.status(409).send("User already exists");
                return;
            }
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
    } catch (error) {
    }
});

// delete all the sessions for a user
router.delete('/users/session/', async (req, res) => {
    try {
        const obj = req.body;
        if (!validateSession(obj)) {
            res.status(400).send("Bad Request");
            return;
        }
        const result = dao.deleteSessionByUser(obj.email);
        result.then((data) => {
            userSessionMap.get(data.user_id).forEach((session) => {
                sessionUserMap.delete(session);
            })
            userSessionMap.delete(data.user_id);
            res.status(204).send('');
        }).catch((err) => {
            res.status(500).send("Internal Server Error");
        });
    } catch (error) {

    }
});

// gets info about notifications set up
router.get('/users/notifications/', async (req, res) => {

    const result = dao.getNotifications();
    result.then((data) => {

        // Respond to the client with a success message
        res.status(200).send(data);
    }).catch((err) => {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    });
});

// Gets info about notifications set up for a specific user
router.get('/users/notifications/:userid', async (req, res) => {
    const userId = req.params.userid; // Get the user ID from the request parameters
    try {
        const data = await dao.getNotificationsByID(userId); // Pass the user ID to the DAO method
        res.status(200).json(data); // Respond to the client with the retrieved data in JSON format
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        res.status(500).send("Internal Server Error"); // Send a 500 status code for internal server errors
    }
});

// deletes a specific notif
router.delete('/users/notifications/', async (req, res) => {

    try {
        const obj = req.body;
        // check the post message for the correct fields
        if (!validateUsertime(obj)) {
            res.status(400).send("Bad Request");
            return;
        }

        // deletes it
        const result = dao.removeNotification(obj.user_id, obj.room_id);
        res.status(204).send(result);
        // if the query failed send an error message
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }

});

// posting a new notification
router.post('/users/notifications/', async (req, res) => {
    try {

        const obj = req.body;
        const validationErrors = validateUsertime(obj);
        if (validationErrors) {
            const errorMessage = Object.values(validationErrors).join(', ');
            res.status(400).send(`Validation Error: ${errorMessage}`);
            return;
        }

        // adds the data to the dao.

        const result = dao.addNotification(obj.user_id, obj.room_id, obj.room_threshold, obj.start_time, obj.end_time);

        // if the query failed send an error message

        res.status(204).send('');
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router; 