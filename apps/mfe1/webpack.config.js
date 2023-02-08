const {
	withModuleFederationPlugin,
	shareAll,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
	name: 'mfe1',
	exposes: {
		'./Module': 'apps/mfe1/src/app/remote-entry/entry.module.ts',
	},
	shared: {
		...shareAll({
			singleton: true,
			strictVersion: true,
			requiredVersion: 'auto',
		}),
	},
});
