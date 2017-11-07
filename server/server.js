const path = require('path');
var express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'Server',
        text: 'Welcome to chat room',
        createAt: 123
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('createMessage', (message) => {
        console.log('Create Message', message);
    });
});

server.listen(port, () => {
    console.log('Started on port: ' + port);
});