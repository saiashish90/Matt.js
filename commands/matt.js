let alexa = require('alexa-bot-api');
let ai = new alexa('aw2plm');
module.exports = {
	name        : 'matt',
	description : 'Ask me anything',
	args        : false,
	argsLen     : 'any',
	guildOnly   : false,
	help(msg) {
		data = {
			color       : 0xff7b00,
			title       : `Matt`,
			description : `$matt [anything you want]\nYou can ask me anything you want, or just talk to me :))`
		};
		embed = new MessageEmbed(data);
		msg.channel.send(embed);
	},
	execute(msg, args) {
		if (args.length) ai.getReply(args.join(' ')).then((reply) => msg.reply(reply));
		else msg.reply('Whats up?');
	}
};
