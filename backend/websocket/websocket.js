const { WebSocket, WebSocketServer } = require('ws');
const { createServer } = require('http');
const Ajv = require("ajv");
const ajv = new Ajv();

const schemaMessage = {
    type: "object",
    properties: {
        type: { type: "string", enum: ["update", "print"] },
        data: { type: "object" }
    },

    required: ["type", "data"],
    additionalProperties: false
};

const validateMessage = ajv.compile(schemaMessage);

const server = createServer({ port: 8081 });
const wss = new WebSocketServer({ server: server });
// Store active WebSocket connections

console.log("Starting WebSocketServer")
const handlers = {
    "update": function update(ws, data) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    },
    "print": function print(ws, data) {
        let obj;
        try {
            obj = JSON.parse(data);
        } catch (error) {

        }
        console.log("Websocket Server Printing: " + JSON.stringify(obj));
    }
};

function messageHandler(ws, data) {
    let obj;
    try {
        obj = JSON.parse(data);
    } catch (error) {
        console.warn("Invalid JSON", error);
    }
    if (!validateMessage(obj)) { return };

    handlers[obj.type](ws, obj.data);
}

wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (data) => messageHandler(ws, data));

    ws.on('close', () => {

    });

});

console.log("Created WebSocketServer on port 8081");

server.listen(8081);
