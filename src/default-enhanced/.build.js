#!/usr/bin/env node

import path from 'path';
import fs from 'fs';

import {minify as jsMinify} from 'terser';
import {minify as cssMinify} from 'csso';
import {minify as htmlMinify} from 'html-minifier';

const themePath = path.dirname(import.meta.url).replace(/^\w+:\/\//,'');
const theme = path.basename(themePath);
const outputPath = path.resolve(`${themePath}/../../output/${theme}`);

fs.rmSync(outputPath, {recursive: true, force: true});
fs.mkdirSync(outputPath, {recursive: true});

fs.readdirSync(themePath).forEach(async file => {
	if (file.startsWith('.') || file.indexOf('.') < 0) {
		return;
	}

	const srcFile = `${themePath}/${file}`;
	const dstFile = `${outputPath}/${file}`;

	const ext = path.extname(file)
	switch (ext) {
		case '.js':
			minifyJs(file, srcFile, dstFile);
			break;
		case '.css':
			minifyCss(srcFile, dstFile);
			break;
		case '.html':
			minifyHtml(srcFile, dstFile);
			break;
		case '.ico':
			copyFile(srcFile, dstFile);
			break;
		default:
			console.warn("Unknown file extension", ext)
			break;
	}
});

async function minifyJs(file, srcFile, dstFile) {
	const input = {
		[file]: fs.readFileSync(srcFile, {encoding: 'utf8'})
	}
	const output = (await jsMinify(input, {
		ie8: true,
		safari10: true,
		compress: {
			negate_iife: false
		}
	})).code;
	fs.writeFileSync(dstFile, output);
}

function minifyCss(srcFile, dstFile) {
	const input = fs.readFileSync(srcFile, {encoding: 'utf8'});
	const output = cssMinify(input).css;
	fs.writeFileSync(dstFile, output);
}

function minifyHtml(srcFile, dstFile) {
	const input = fs.readFileSync(srcFile, {encoding: 'utf8'});
	const output = htmlMinify(input, {
		collapseWhitespace: true,
		minifyJS: true,
	});
	fs.writeFileSync(dstFile, output);
}

function copyFile(srcFile, dstFile) {
	fs.copyFileSync(srcFile, dstFile);
}
