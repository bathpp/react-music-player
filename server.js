var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	// It suppress error shown in console
	quiet: false,
	// It suppress everything except error
	noInfo: false,
	stats: {
		// config for minimal console.log 
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chucks: false,
		chunkModules: false
	}
}).listen(3333, 'localhost', function(err, result) {
	if (err) {
		return console.log(err);
	}

	console.log('Listening at http://localhost:3333/');
});