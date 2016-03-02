var socket = io();
var statusMessage = document.getElementById('status-message');
var connectionCount = document.getElementById('connection-count');
var buttons = document.querySelectorAll('#choices button');
var voteTally = document.getElementById('vote-tally');
var voteMessage = document.getElementById('vote-message');

socket.on('usersConnected', function (count) {
    connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
    statusMessage.innerText = message;
});

socket.on('voteCount', function (votes) {
    voteTally.innerText =  '  '  + votes['A'];
    voteTally.innerText += '  ' + votes['B'];
    voteTally.innerText += '  ' + votes['C'];
    voteTally.innerText += '  ' + votes['D'];
});

socket.on('voteMessage', function (vote) {
    voteMessage.innerText = 'Thanks for voting for ' + vote;
});

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        socket.send('voteCast', this.innerText);
    });
}