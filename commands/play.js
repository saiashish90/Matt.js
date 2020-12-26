const { MessageEmbed } = require('discord.js');

module.exports = {
	name        : 'play',
	description : "Play' sound effects",
	args        : false,
	argsLen     : 2,
	guildOnly   : true,
	help(msg) {
		data = {
			color       : 0xff7b00,
			title       : `Play`,
			description : `\`$play\`\n\nPlays sound effects`
		};
		embed = new MessageEmbed(data);
		msg.channel.send(embed);
	},
	async execute(msg, args) {
		console.log('playsiong');
		const connection = await msg.member.voice.channel.join();
		const dispatcher = connection.play('./Audio/bruh.mp3');
	}
};
