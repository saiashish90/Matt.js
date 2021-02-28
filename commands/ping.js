const { MessageEmbed } = require('discord.js');

module.exports = {
	name        : 'ping',
	description : 'Ping!',
	args        : true,
	argsLen     : 2,
	guildOnly   : true,
	help(msg) {
		data = {
			color       : 0xff7b00,
			title       : `Ping`,
			description : `\`$ping [role/user] [n]\`\n\nPing spams tagged user`
		};
		embed = new MessageEmbed(data);
		msg.channel.send(embed);
	},
	execute(msg, args) {
		messages = [
			'peepee small',
			'thou art gay',
			'your family tree lgbt',
			'your granny tranny',
			'your sister mister',
			'your family reuninon homosexual communion',
			'negative stonks',
			'homosexual panda',
			'chicken boy',
			'hahaha wow hmps',
			'QUAAAACCKK',
			'dadialtar',
			'bimbi',
			'yo momma so fat thanos had to clap twice'
		];

		let channel = msg.guild.channels.cache.find((channel) => channel.name.toLowerCase() === `bot-spam`);
		if (channel) {
			const taggedUser =
				msg.mentions.members.size ? msg.mentions.members.first().user :
				null;
			const user = bot.users.cache.find((user) => user === taggedUser || user.username === args[0]);
			if (!user) {
				this.help(msg);
				return;
			}
			for (let i = 0; i < args[1]; i++) {
				if (i === 25) {
					data = {
						color       : 0xff7b00,
						title       : `Ping`,
						description : `Ping limit is 25`
					};
					embed = new MessageEmbed(data);
					channel.send(embed);
					break;
				}
				channel.send(`${messages[Math.floor(Math.random() * messages.length)]} ${user}`);
			}
		} else {
			data = {
				color       : 0xff7b00,
				title       : `Ping`,
				description : `Make a channel called 'bot-spam' to use the ping command`
			};
			embed = new MessageEmbed(data);
			msg.channel.send(embed);
		}
	}
};
