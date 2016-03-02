const http = require('http');
const express = require('express');
const app = express();
const socketIo = require('socket.io');

var port = process.env.port || 3000;
var server = http.createServer(app);
var votes = {};

function countVotes(votes) {
    var voteCount = {
        A: 0,
        B: 0,
        C: 0,
        D: 0
    };
    for (var vote in votes) {
        voteCount[votes[vote]]++
    }
    return voteCount;
}

server.listen(port, function () {
    console.log('Listening on port ' + port + '.');
});

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

const io = socketIo(server);
io.on('connection', function (socket) {
    console.log('A user has connected.', io.engine.clientsCount);

    io.sockets.emit('usersConnected', io.engine.clientsCount);
    socket.emit('statusMessage', 'You have connected');
    io.sockets.emit('voteCount', countVotes(votes));

    socket.on('message', function (channel, message) {
        if (channel === 'voteCast') {
            votes[socket.id] = message;
            socket.emit('voteMessage', message);
            io.sockets.emit('voteCount', countVotes(votes));
        }
    });

    socket.on('disconnect', function () {
        console.log('A user has disconnected.', io.engine.clientsCount);
        delete votes[socket.id];
        socket.emit('voteCount', countVotes(votes));
        io.sockets.emit('usersConnected', io.engine.clientsCount);
    })
});

module.exports = server;