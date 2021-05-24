const path = require('path');

const themePath = path.resolve(__dirname, 'source');
const theme = path.basename(__dirname);
const outputPath = path.resolve(`${__dirname}/../../output/${path.basename(__dirname)}`);

module.exports = {
	themePath,
	theme,
	outputPath
}
