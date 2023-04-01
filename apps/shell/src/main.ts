import { loadMfeManifest } from './utils/load-mfe-manifest.util';

loadMfeManifest('https://cdn.m-tarasov.com/mf-demo/mf.manifest.json')
	.catch((err) => console.error(err))
	.then(() => import('./bootstrap'))
	.catch((err) => console.error(err));
