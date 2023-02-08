const {
	withModuleFederationPlugin,
	shareAll,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
	name: 'mfe2',
	exposes: {
		'./Component': 'apps/mfe2/src/app/remote-entry/entry.component.ts',
	},
	shared: {
		...shareAll({
			singleton: true,
			strictVersion: true,
			requiredVersion: 'auto',
		}),
	},
});
