require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
// Initializing commands
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
Object.keys(botCommands).map((key) => {
	bot.commands.set(botCommands[key].name, botCommands[key]);
});

// Bot variables
const TOKEN = process.env.TOKEN;
const prefix = '$';
// Bot connect methods
bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
	bot.user.setActivity('Wii Sports', { type: 'PLAYING' });
});

//Amongus capture socketio
bot.games = new Discord.Collection();
const io = require('socket.io')();
io.on('connection', (socket) => {
	socket.on('connectCode', function(data) {
		console.log(`Got connect code: ${data} ID:${socket.id}`);
		if (bot.games.has(Number(data))) {
			console.log('game running');
			temp = bot.games.get(Number(data));
			bot.games.set(socket.id, temp);
			bot.games.delete(Number(data));
		} else {
			console.log('Use command on discord first');
		}
	});
	socket.on('state', function(data) {
		console.log(`Got game state change: ${data} ID:${socket.id}`);
		if (Number(data) === 1) console.log('MUTE');
		else console.log('UNMUTE');
	});
});
// Command handler
bot.on('message', (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	const commandBody = msg.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	if (!bot.commands.has(command)) return;
	try {
		bot.commands.get(command).execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});
global.bot = bot;
bot.login(TOKEN);
io.listen(3000);
