const process = require('process');
const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require('./webpack.config');

const {PORT, UPSTREAM_PORT} = process.env;
const port = parseInt(PORT, 10) || 8000;
const upstreamPort = parseInt(UPSTREAM_PORT, 10) || 8001;

const sourcePath = path.resolve(__dirname, 'source')

const compiler = webpack(webpackConfig);
const serveWebpackAsset = webpackDevMiddleware(compiler, {
	// webpack-dev-middleware options
})
const serveAsset = (req, res, next) => {
	if (req.query.asset) {
		req.url = path.normalize('/' + req.query.asset);
		serveWebpackAsset(req, res, () => {
			res.status(404);
			res.end();
		});
		return;
	}

	next && next();
}

const serveHtmlTemplate = (req, res, next) => {
	if (!Object.keys(req.query).length || req.query.download) {
		const assetFsPath = path.resolve(sourcePath, 'index.html');
		if (fs.existsSync(assetFsPath)) {
			const fstream = fs.createReadStream(assetFsPath);
			fstream.pipe(res);
		} else {
			res.status(400);
			res.end();
			process.stderr.write(`html template not found: ${assetFsPath}`)
		}
		return;
	}

	next && next()
}

const serveProxy = (req, res, next) => {
	const url = new URL(req.url, `http://${req.get('host')}:${upstreamPort}`);
	const upReq = http.request(url, {
		method: req.method,
		headers: req.headers,
	});
	upReq.on('response', upRes => {
		res.set(upRes.headers);
		res.status(upRes.statusCode);
		upRes.pipe(res);
	});
	upReq.on('error', () => {
		res.status(500);
		res.end();
	})
	upReq.end();
}

const app = express();
app.use(serveAsset);
app.use(serveHtmlTemplate);
app.use(serveProxy);
app.listen({port});
