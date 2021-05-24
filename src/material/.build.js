#!/usr/bin/env node

const fs = require('fs');

const htmlo = require('html-minifier');
const {themePath, outputPath} = require('./.paths');

fs.rmSync(outputPath, {recursive: true, force: true});
fs.mkdirSync(outputPath, {recursive: true});

minifyHtml(`${themePath}/index.html`, `${outputPath}/index.html`);

function minifyHtml(srcFile, dstFile) {
	const input = fs.readFileSync(srcFile, {encoding: 'utf8'});
	const output = htmlo.minify(input, {
		collapseWhitespace: true,
		minifyJS: true,
	});
	fs.writeFileSync(dstFile, output);
}
