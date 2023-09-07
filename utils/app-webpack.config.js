const {
	SharedMappings,
	shareAll,
} = require('@angular-architects/module-federation/webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

const SHARED_LIBS = ['@angular15mf/core'];

const sharedMappings = new SharedMappings();
sharedMappings.register(
	path.join(__dirname, '../tsconfig.base.json'),
	SHARED_LIBS
);

module.exports = (name, exposes) => ({
	output: {
		publicPath: 'auto',
		uniqueName: name,
	},
	optimization: {
		runtimeChunk: false,
	},
	experiments: {
		outputModule: true,
	},
	resolve: {
		alias: {
			...sharedMappings.getAliases(),
		},
	},
	plugins: [
		new ModuleFederationPlugin({
			library: { type: 'module' },
			name,
			exposes,
			filename: exposes ? 'remoteEntry.js' : undefined,
			shared: {
				...shareAll({
					singleton: true,
					strictVersion: true,
					requiredVersion: 'auto',
				}),
				...sharedMappings.getDescriptors(),
			},
		}),
		sharedMappings.getPlugin(),
	],
});
