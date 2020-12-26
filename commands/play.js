const { MessageEmbed } = require('discord.js');
const soundboardobj = require('../soundboard.json');
const flattenObject = (obj) => {
	const flattened = {};

	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			Object.assign(flattened, flattenObject(obj[key]));
		} else {
			flattened[key] = obj[key];
		}
	});

	return flattened;
};
const soundboard = flattenObject(soundboardobj);
module.exports = {
	name        : 'play',
	description : "Play' sound effects",
	args        : true,
	argsLen     : 1,
	guildOnly   : true,
	help(msg) {
		sounds = '';
		for (const key in soundboardobj) {
			sounds = sounds + `\n**${key}**\n`;
			for (const sound in soundboardobj[key]) {
				sounds = sounds + `${sound}\n`;
			}
		}
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
		if (msg.member.voice && msg.member.voice.channel) {
			if (soundboard.hasOwnProperty(args)) {
				const connection = await msg.member.voice.channel.join();
				const dispatcher = connection.play(soundboard[args]);
				dispatcher.on('error', console.error);
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
