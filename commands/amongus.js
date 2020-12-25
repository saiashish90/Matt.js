const { MessageEmbed } = require('discord.js');

module.exports = {
	name        : 'amongus',
	description : 'Start and amongus game',
	args        : false,
	argsLen     : 0,
	guildOnly   : true,
	help(msg) {
		data = {
			color       : 0xff7b00,
			title       : `AmongUs`,
			description : `$amongus\nAllows auto-mute functionality using AUCapture application.`
		};
		embed = new MessageEmbed(data);
		msg.channel.send(embed);
	},
	execute(msg, args) {
		if (bot.games.find((game) => game.guild.id === msg.guild.id)) {
			data = {
				color       : 0xff7b00,
				title       : `Among Us[BETA]`,
				description : `A game is already being played`
			};
			embed = new MessageEmbed(data);
			msg.channel.send(embed);
		} else {
			if (msg.member.voice && msg.member.voice.channelID) {
				const token = Math.floor(Math.random() * 90000) + 10000;
				data = {
					color       : 0xff7b00,
					title       : `Among Us[BETA]`,
					description : `Connect token : ${token}
							Connect URL : https://matttbot.herokuapp.com\n
							Enter token and URL in AUCapture app
                            Mute/Unmute should happen automatically\n
                            React to the speaker to mute/unmute.
                            React to the stop to stop the game`
				};
				embed = new MessageEmbed(data);
				msg.channel.send(embed).then(async (sent) => {
					gamedata = {
						is_muted      : false,
						guild         : msg.guild,
						vc            : msg.member.voice,
						voice_channel : msg.member.voice.channelID,
						message_id    : sent.id
					};
					bot.games.set(token, gamedata);
					sent.react('🔇').then(() => {
						sent.react('🛑');
					});
					const filter = (reaction, user) => {
						in_channel = bot.games.find(
							(game) => game.voice_channel === reaction.message.guild.member(user.id).voice.channelID
						);
						return (
							[ '🔇', '🛑' ].includes(reaction.emoji.name) &&
							user.id !== sent.author.id &&
							typeof in_channel !== 'undefined'
						);
					};
					const collector = sent.createReactionCollector(filter, { dispose: true });
					collector.on('collect', (reaction, user) => {
						if (reaction.emoji.name === '🔇') {
							vc = bot.games.find((game) => game.guild.id === msg.guild.id).vc;
							vc.channel.members.forEach((member) => {
								member.voice.setMute(true);
								console.log('muted');
							});
						} else if (reaction.emoji.name === '🛑') {
							vc = bot.games.find((game) => game.guild.id === msg.guild.id).vc;
							vc.channel.members.forEach((member) => {
								member.voice.setMute(false);
								console.log('Game ended');
							});
							key = [ ...bot.games ].find(([ key, game ]) => game.guild.id === msg.guild.id)[0];
							bot.games.delete(key);
							reaction.message.delete();
							collector.stop();
						}
					});
					collector.on('remove', (reaction, user) => {
						if (reaction.emoji.name === '🔇') {
							vc = bot.games.find((game) => game.guild.id === msg.guild.id).vc;
							vc.channel.members.forEach((member) => {
								member.voice.setMute(false);
								console.log('unmuted');
							});
						}
					});
				});
			} else {
				data = {
					color       : 0xff7b00,
					title       : `Among Us[BETA]`,
					description : `Join a voice channel to start the game`
				};
				embed = new MessageEmbed(data);
				msg.channel.send(embed);
			}
		}
	}
};
