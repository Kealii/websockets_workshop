var socket = io();
var statusMessage = document.getElementById('status-message');
var connectionCount = document.getElementById('connection-count');
var buttons = document.querySelectorAll('#choices button');
var voteCount = document.getElementById('vote-tally');

socket.on('usersConnected', function (count) {
    connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
    statusMessage.innerText = message;
});

socket.on('voteCount', function (votes) {
    voteCount.innerText = 'A: ' + votes['A'] + ' ' +
                          'B: ' + votes['B'] + ' ' +
                          'C: ' + votes['C'] + ' ' +
                          'D: ' + votes['D'];
});

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        socket.send('voteCast', this.innerText);
    });
}