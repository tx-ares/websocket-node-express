import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//init a simple http server
const server = http.createServer(app);

//init the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    ws.isAlive = true;

    ws.on('pong', () => {
        ws.isAlive = true;
    });

    //when connection is established, add a simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to client
        console.log('received: %s', message);

        const broadcastRegex = /^broadcast\:/;

        if (broadcastRegex.test(message)) {
            message = message.replace(broadcastRegex, '');

            //Send back the message to the other clients
            wss.clients
                .forEach(client => {
                    if (client != ws) {
                        client.send(`Hello, broadcast message -> ${message}`);
                    }
                });
        } else {
            ws.send(`Hello, you sent: ${message}`);
        }
    });

    //send feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server on port 4000!');
});

setInterval(() => {
    wss.clients.forEach((ws: ExtWebSocket) => {
        if (!ws.isAlive) return ws.terminate();

        ws.isAlive = false;
        ws.ping(null, false, true);
    });
}, 10000);

//start the Server
server.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
