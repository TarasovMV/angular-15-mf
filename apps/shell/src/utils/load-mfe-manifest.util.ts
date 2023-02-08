import {
	loadRemoteModule,
	LoadRemoteModuleOptions,
} from '@angular-architects/module-federation';
import { Route } from '@angular/router';

interface MfeManifestDto {
	path: string;
	exposed: string;
	entity: string;
	type: MfeType;
}

type MfeManifestMap = { [key: string]: MfeManifestDto };
type MfeType = 'component' | 'module';

export abstract class MfeManifest {
	private static hash = new Date().getTime();
	private static _manifest: MfeManifestMap = {};
	static set manifest(config: MfeManifestDto) {
		Object.assign(MfeManifest._manifest, config);
	}

	static getRoute(path: string, app: string): Route {
		const route = { path };
		const options = MfeManifest.getOptions(app);

		if (MfeManifest.getType(app) === 'component') {
			return {
				...route,
				loadComponent: () =>
					loadRemoteModule(options).then(
						(m) => m[MfeManifest.getEntity(app)]
					),
			};
		}

		return {
			...route,
			loadChildren: () =>
				loadRemoteModule(options).then(
					(m) => m[MfeManifest.getEntity(app)]
				),
		};
	}

	static getOptions = (app: string): LoadRemoteModuleOptions => ({
		type: 'module',
		remoteEntry: `${MfeManifest._manifest[app]?.path}?${MfeManifest.hash}`,
		exposedModule: MfeManifest._manifest[app]?.exposed,
	});

	static getType = (app: string): MfeType =>
		MfeManifest._manifest[app]?.type ?? 'module';
	static getEntity = (app: string): string =>
		MfeManifest._manifest[app]?.entity;
	static checkApp = (app: string): boolean => !!MfeManifest._manifest[app];
}

export const loadMfeManifest = (path: string = 'assets/mf.manifest.json') =>
	fetch(path)
		.then((res) => res.json())
		.then((manifest) => (MfeManifest.manifest = manifest));
