#!/usr/bin/env node

import {fileURLToPath} from "node:url";
import {basename, dirname, extname, resolve} from 'node:path';

import {minify as jsMinify} from 'terser';
import CleanCSS from 'clean-css';
import {minify as htmlMinify} from 'html-minifier';
import {copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';

const themePath = dirname(fileURLToPath(import.meta.url));
const theme = basename(themePath);
const outputPath = resolve(`${themePath}/../../output/${theme}`);

rmSync(outputPath, {recursive: true, force: true});
mkdirSync(outputPath, {recursive: true});

readdirSync(themePath).forEach(async file => {
	if (file.startsWith('.') || file.indexOf('.') < 0) {
		return;
	}

	const srcFile = `${themePath}/${file}`;
	const dstFile = `${outputPath}/${file}`;

	const ext = extname(file)
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
			console.warn("Unknown file extension", ext);
			break;
	}
});

async function minifyJs(file, srcFile, dstFile) {
	const input = {
		[file]: readFileSync(srcFile, {encoding: 'utf8'})
	}
	const output = (await jsMinify(input, {
		module: true,
	})).code;
	writeFileSync(dstFile, output);
}

function minifyCss(srcFile, dstFile) {
	const input = readFileSync(srcFile, {encoding: 'utf8'});
	const output = new CleanCSS({}).minify(input).styles;
	writeFileSync(dstFile, output);
}

function minifyHtml(srcFile, dstFile) {
	const input = readFileSync(srcFile, {encoding: 'utf8'});
	const output = htmlMinify(input, {
		collapseWhitespace: true,
		minifyJS: true,
	});
	writeFileSync(dstFile, output);
}

function copyFile(srcFile, dstFile) {
	copyFileSync(srcFile, dstFile);
}
