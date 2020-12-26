const { description } = require('./commands/play');
const soundboard = require('./soundboard.json');
sounds = '';
for (const key in soundboard) {
	sounds = sounds + `\n${key}\n`;
	for (const sound in soundboard[key]) {
		sounds = sounds + `${sound}\n`;
	}
}
console.log(sounds);
