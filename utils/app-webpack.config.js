const {
	withModuleFederationPlugin,
	shareAll,
	SharedMappings,
} = require('@angular-architects/module-federation/webpack');
const path = require('path');

const SHARED_LIBS = ['@angular15mf/core', '@angular15mf/rx-store'];

const sharedMappings = new SharedMappings();
sharedMappings.register(
	path.join(__dirname, '../tsconfig.base.json'),
	SHARED_LIBS
);

module.exports = (name, exposes = undefined) =>
	withModuleFederationPlugin({
		name,
		exposes,
		shared: {
			...shareAll({
				singleton: true,
				strictVersion: true,
				requiredVersion: 'auto',
			}),
			...sharedMappings.getDescriptors(),
		},
	});
