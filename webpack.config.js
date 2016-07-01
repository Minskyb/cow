/**
 * Created by ASUS on 2016/6/30.
 */
var webpack = require('webpack');

module.exports = {
	entry:{
		modal:"./example/entry/modal.js"
	},
	output:{
		path:'example/dist/',
		filename:'[name].js'
	},
	module: {
		loaders: [
			{
				test:/\.js$/,
				loaders:['babel'],
				exclude:/node_modules/,
				include:__dirname
			}
		]
	},
	externals:{
		"jquery":"jQuery"
	},
	// plugins:[
	// 	new webpack.optimize.DedupePlugin(),
	// 	new webpack.optimize.OccurrenceOrderPlugin(),
	// 	new webpack.optimize.UglifyJsPlugin()
	// ]
}