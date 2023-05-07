import { Route } from '@angular/router';
import { MfeManifest } from '../utils/load-mfe-manifest.util';

export const appRoutes: Route[] = [
	{
		path: '',
		loadComponent: () =>
			import('./components/home.component').then((c) => c.HomeComponent),
	},
	{
		path: 'lazy',
		loadComponent: () =>
			import('./components/lazy-wrapper.component').then(
				(c) => c.LazyWrapperComponent
			),
	},
	MfeManifest.getRoute('mfe1', 'mfe1'),
	MfeManifest.getRoute('mfe2', 'mfe2'),
	{
		path: '**',
		redirectTo: '',
	},
];
