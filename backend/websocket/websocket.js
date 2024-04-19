const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8081 });
console.log("Starting WebSocketServer")
handlers = {
    "update": update,
    "print": print
};
function update(ws, data) {
    ws.send("updated " + data)
}

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
    ws.on('error', console.error);

    ws.on('message', (data) => messageHandler(ws, data))

});

console.log("Created WebSocketServer on port 8081");


