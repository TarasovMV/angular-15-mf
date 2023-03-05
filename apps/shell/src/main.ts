import { loadMfeManifest } from './utils/load-mfe-manifest.util';

loadMfeManifest('assets/mf.manifest.prod.json')
	.catch((err) => console.error(err))
	.then(() => import('./bootstrap'))
	.catch((err) => console.error(err));
