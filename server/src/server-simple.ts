import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//init a simple http server
const server = http.createServer(app);

//init the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    //when connection is established, add a simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to client
        console.log('received: %s', message);

        ws.send(`Hello, you sent: ${message}`);

    });

    //send feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server on port 4000!');
});

//start the Server
server.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
