import { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: '',
		loadComponent: () =>
			import('./remote-entry/entry.component').then(
				(m) => m.RemoteEntryComponent
			),
	},
];
