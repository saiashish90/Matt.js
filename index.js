require('dotenv').config();
const { wakeDyno } = require('heroku-keep-awake');
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
		if (bot.games.has(Number(data))) {
			temp = bot.games.get(Number(data));
			bot.games.set(socket.id, temp);
			bot.games.delete(Number(data));
		}
	});
	socket.on('state', function(data) {
		if (Number(data) === 1) {
			try {
				bot.games.get(socket.id).vc.channel.members.forEach((member) => {
					member.voice.setMute(true);
				});
			} catch (error) {}
		} else {
			try {
				bot.games.get(socket.id).vc.channel.members.forEach((member) => {
					member.voice.setMute(false);
				});
			} catch (error) {}
		}
	});
});
// Command handler
bot.on('message', (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	const commandBody = msg.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const commandName = args.shift().toLowerCase();
	if (!bot.commands.has(commandName)) return;
	const command = bot.commands.get(commandName);
	try {
		if (command.guildOnly && msg.channel.type === 'dm') {
			return msg.reply("I can't execute that command inside DMs!");
		}
		if (command.args && args.length !== command.argsLen) {
			return command.help(msg);
		}
		command.execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

global.bot = bot;
bot.login(TOKEN);
// for keeping heroku wake
const DYNO_URL = 'https://matttbot.herokuapp.com';
const opts = {
	interval  : 29,
	logging   : false,
	stopTimes : { start: '00:00', end: '00:00' }
};
wakeDyno(DYNO_URL, opts);
io.listen(process.env.PORT || 3000);
