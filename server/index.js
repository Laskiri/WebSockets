const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

app.use(express.static('../app'));



app.get('/', (req, res) => {
    
    res.sendFile('/index.html');
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});