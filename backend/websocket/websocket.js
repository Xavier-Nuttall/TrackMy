const {WebSocketServer} = require('ws');

const wss = new WebSocketServer({port: 8081});

wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', data => {
        obj = JSON.parse(data);
        if ("message" in obj){
            if (obj.message == "update"){
            }
        }
    });
});

