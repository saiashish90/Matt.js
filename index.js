require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
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

bot.login(TOKEN);
