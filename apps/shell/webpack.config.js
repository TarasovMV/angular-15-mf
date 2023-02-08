const {
	withModuleFederationPlugin,
	shareAll,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
	name: 'shell',
	shared: {
		...shareAll({
			singleton: true,
			strictVersion: true,
			requiredVersion: 'auto',
		}),
	},
});
