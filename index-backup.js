const io = require('socket.io')();

//Refer to Types.ts for types.

io.on('connection', (socket) => {
	socket.on('connectCode', function(data) {
		//NOT GAME CODE. Type: String
		console.log(`Got connect code: ${data} ID:${socket.id}`);
	});

	socket.on('botID', function(data) {
		//This is only sent if the client has a discord bot attached to it. Type: ulong? uint64
		console.log(`Got botID: ${data}`);
	});

	socket.on('state', function(data) {
		//Sent on game change, like game phase. Type: GameStateEvent
		console.log(`Got game state change: ${data} ID:${socket.id}`);
	});

	socket.on('player', function(data) {
		//Sent on player change. Join, leave, die. Type: PlayerChangedEvent
		console.log(`Got player change: ${data}`);
	});

	socket.on('lobby', function(data) {
		//Sent on request and on lobby join. Type: LobbyEvent
		console.log(`Got room code: ${data}`);
	});

	socket.on('gameover', function(data) {
		//Sent on game over. Type: GameOverEvent
		console.log(`Got room code: ${data}`);
	});

	socket.on('taskComplete', function(data) {
		//Sent on discord update task complete
		console.log(`Got completed Task: ${data}`);
	});

	socket.on('taskFailed', function(data) {
		//Sent on discord update task Failed
		console.log(`Got failed Task: ${data}`);
	});
	if (true) {
		// socket.emit('requestdata'); //Requests resend of data from the capture
		// socket.emit('killself'); //Forces capture to close.
		// socket.emit('modify', {
		// 	guildID    : 1234,
		// 	userID     : 1234,
		// 	parameters : {
		// 		deaf : true,
		// 		mute : true
		// 	},
		// 	taskID     : 'HasToBeAString'
		// });
	}
});

console.log('Listening on port 3000');
io.listen(3000);
