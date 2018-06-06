import * as express from 'express';
import * as http from 'http';

import * as Sockette from 'sockette';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const ws = new Sockette('ws://localhost:4000', {
  timeout: 5e3,
  maxAttempts: 10,
  onopen: e => console.log('Connected!', e),
  onmessage: e => console.log('Received:', e),
  onreconnect: e => console.log('Reconnecting...', e),
  onmaximum: e => console.log('Stop Attempting!', e),
  onclose: e => console.log('Closed!', e),
  onerror: e => console.log('Error:', e)
});

ws.send('Hello, world!');
ws.close(); // graceful shutdown

// Reconnect 10s later
setTimeout(ws.reconnect, 10e3);

// start server
server.listen(process.env.PORT || 4000, () => {
    console.log((`Server started on port ${server.address().port} :)`))
});
