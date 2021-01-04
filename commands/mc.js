const { MessageEmbed } = require('discord.js');
var admin = require('firebase-admin');
admin.initializeApp({
	credential  : admin.credential.cert(JSON.parse(process.env.GOOGLE)),
	databaseURL : 'https://amongus-44241.firebaseio.com'
});
const db = admin.firestore();
const Fieldvalue = admin.firestore.FieldValue;
module.exports = {
	name        : 'mc',
	description : 'MC',
	args        : false,
	argsLen     : 'any',
	guildOnly   : true,
	help(msg) {
		data = {
			color       : 0xff7b00,
			title       : `Minecraft`,
			description : `\`$mc add <location name> x y\`\n\`$mc list\`\n\`$mc remove <location/all>\`\n\nCommand to manage minecraft location co-ordinates.`
		};
		embed = new MessageEmbed(data);
		msg.channel.send(embed);
	},
	async execute(msg, args) {
		if (!args[0]) {
			this.help(msg);
			return;
		}
		if (args[0] === 'add') {
			if (args.length === 4) {
				if (args[1] === 'all') {
					embeddata = {
						color       : 0xff7b00,
						title       : `Minecraft`,
						description : `Can't name location all.`
					};
					embed = new MessageEmbed(embeddata);
					msg.channel.send(embed);
					return;
				}
				const data = {};
				data[args[1]] = `${args[2]},${args[3]}`;
				db.collection('Mattt').doc(msg.author.id).set(data, { merge: true });
				embeddata = {
					color       : 0xff7b00,
					title       : `Minecraft`,
					description : `**${args[1]}** : \`${args[2]},${args[3]}\`.`
				};
				embed = new MessageEmbed(embeddata);
				msg.channel.send(embed);
				return;
			}
			this.help(msg);
		}
		if (args[0] === 'list') {
			const snapshot = await db.collection('Mattt').doc(msg.author.id).get();
			const location = await snapshot.data();
			if (!location) {
				embeddata = {
					color       : 0xff7b00,
					title       : `Minecraft`,
					description : `You do not have any locations saved yet.`
				};
				embed = new MessageEmbed(embeddata);
				msg.channel.send(embed);
				return;
			}
			embeddata = {
				color : 0xff7b00,
				title : `Minecraft`
			};
			des = '';
			for (const key in location) {
				const element = location[key];
				des = des + `**${key}** : \`${element}\`\n`;
			}
			embeddata['description'] = des;
			embed = new MessageEmbed(embeddata);
			msg.channel.send(embed);
		}
		if (args[0] === 'remove') {
			if (args.length === 2) {
				if (args[1] === 'all') {
					db.collection('Mattt').doc(msg.author.id).delete();
					embeddata = {
						color       : 0xff7b00,
						title       : `Minecraft`,
						description : `Removed all locations.`
					};
					embed = new MessageEmbed(embeddata);
					msg.channel.send(embed);
				} else {
					db.collection('Mattt').doc(msg.author.id).update({
						[args[1]]: Fieldvalue.delete()
					});
					embeddata = {
						color       : 0xff7b00,
						title       : `Minecraft`,
						description : `Removed **${args[1]}**.`
					};
					embed = new MessageEmbed(embeddata);
					msg.channel.send(embed);
				}
				return;
			}
			this.help(msg);
		}
	}
};
