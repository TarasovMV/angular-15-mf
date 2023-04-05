const webpackConfigurator = require('../../utils/app-webpack.config');

module.exports = webpackConfigurator('mfe1', {
	'./Module': 'apps/mfe1/src/app/remote-entry/entry.module.ts',
});
