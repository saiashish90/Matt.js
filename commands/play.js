const { MessageEmbed } = require('discord.js');
const soundboard = require('../soundboard.json');

module.exports = {
	name        : 'play',
	description : "Play' sound effects",
	args        : true,
	argsLen     : 1,
	guildOnly   : true,
	help(msg) {
		sounds = Object.keys(soundboard).join('\n');
		console.log(sounds);
		data = {
			color       : 0xff7b00,
			title       : `Soundboard`,
			description : `\`$play [soundname]\`\nPlays selected sound effect.\n\nList of all available sounds:\n${sounds}`
		};
		embed = new MessageEmbed(data);
		msg.channel.send(embed);
	},
	async execute(msg, args) {
		console.log('playsiong');
		if (msg.member.voice && msg.member.voice.channel) {
			if (soundboard.hasOwnProperty(args)) {
				const connection = await msg.member.voice.channel.join();
				const dispatcher = connection.play(soundboard[args]);
				dispatcher.on('finish', () => {
					connection.disconnect();
				});
			} else {
				data = {
					color       : 0xff7b00,
					title       : `Soundboard`,
					description : `Sound doesnt exist.\n\nUse \`$help play\` to get a list of all the available sounds`
				};
				embed = new MessageEmbed(data);
				msg.channel.send(embed);
			}
		} else {
			data = {
				color       : 0xff7b00,
				title       : `Soundboard`,
				description : `Join a voice channel to play sounds`
			};
			embed = new MessageEmbed(data);
			msg.channel.send(embed);
		}
	}
};
