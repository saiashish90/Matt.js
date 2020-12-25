const { MessageEmbed } = require('discord.js');

module.exports = {
	name        : 'help',
	description : 'Sends a list of all the commands!',
	args        : false,
	argsLen     : 1,
	guildOnly   : false,
	execute(msg, args) {
		const commands = [ ...bot.commands.values() ];
		if (args.length) {
			commandName = args[0].toLowerCase();
			if (commandName !== 'help') {
				commands.find((command) => command.name === commandName).help(msg);
			}
		} else {
			let description = '';
			description = description + commands.map((command, index) => `${index + 1}. $${command.name}`).join('\n');
			data = {
				color       : 0xff7b00,
				title       : `List of all the commands\n`,
				description : `You can send \`$help [command name]\` to get info on a specific command!\n\n${description}`
			};
			const embed = new MessageEmbed(data);
			msg.author
				.send(embed)
				.then(() => {
					if (msg.channel.type === 'dm') return;
					msg.reply("I've sent you a DM with all my commands!");
				})
				.catch((error) => {
					console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
					msg.reply("it seems like I can't DM you! Do you have DMs disabled?");
				});
		}
	}
};
