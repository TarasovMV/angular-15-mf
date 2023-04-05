const webpackConfigurator = require('../../utils/app-webpack.config');

module.exports = webpackConfigurator('mfe2', {
	'./Component': 'apps/mfe2/src/app/remote-entry/entry.component.ts',
});
