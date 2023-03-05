import { loadMfeManifest } from './utils/load-mfe-manifest.util';
import { isDevMode } from '@angular/core';

loadMfeManifest(
	isDevMode() ? 'assets/mf.manifest.json' : 'assets/mf.manifest.prod.json'
)
	.catch((err) => console.error(err))
	.then(() => import('./bootstrap'))
	.catch((err) => console.error(err));
