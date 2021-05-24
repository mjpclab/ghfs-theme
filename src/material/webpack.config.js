const process = require('process');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const {outputPath} = require('./.paths');

const isProduction = process.env.NODE_ENV === 'production'

const getCssConfig = isModule => {
	const config = [
		{loader: MiniCssExtractPlugin.loader},
		{
			loader: 'css-loader',
			options: {
				modules: isModule && {
					localIdentName: '[name]-[local]'
				}
			}
		},
	]
	return config;
}
const getSassConfig = isModule => {
	const config = getCssConfig(isModule);
	config.push({
		loader: 'sass-loader'
	})
	return config;
}

module.exports = {
	mode: isProduction ? 'production' : 'none',
	entry: './source/index.js',
	output: {
		filename: 'index.js',
		path: outputPath,
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /(?<!\.module)\.css$/i,
				use: getCssConfig(false),
			},
			{
				test: /\.module\.css$/i,
				use: getCssConfig(true),
			},
			{
				test: /(?<!\.module)\.s[ac]ss$/i,
				use: getSassConfig(false),
			},
			{
				test: /\.module\.s[ac]ss$/i,
				use: getSassConfig(true),
			},
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'index.css'
		})
	],
	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
			})
		],
	},
};
