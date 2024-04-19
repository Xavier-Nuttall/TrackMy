const { WebSocket } = require('ws');

const wss = new WebSocket.Server({ port: 8081 });
// Store active WebSocket connections

console.log("Starting WebSocketServer")
handlers = {
    "update": update,
    "print": print
};
function update(ws, data) {
    broadcast("update" + data)
    console.log('backend says hi');
}

// Function to broadcast messages to all clients
wss.broadcast = function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};



function print(ws, data) {
    console.log(data);

}

function messageHandler(ws, data) {
    // Parse it
    let obj;
    try {
        obj = JSON.parse(data);
    } catch (error) {
        console.error("Websocket parsing error")
        ws.terminate();
        return;
    }

    // this is just an example
    if ("message" in obj && "data" in obj && obj.message in handlers) {
        handlers[obj.message](ws, obj.data);
    } else{
        console.log("invalid handler");
    }


}

wss.on('connection', (ws) => {
    console.log('Connection');

    ws.on('error', console.error);

    ws.on('message', (data) => messageHandler(ws, data));

    ws.on('close', () => {
        
    });

});

console.log("Created WebSocketServer on port 8081");

module.exports = wss;
