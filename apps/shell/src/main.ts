import { loadMfeManifest } from './utils/load-mfe-manifest.util';

loadMfeManifest()
	.catch((err) => console.error(err))
	.then(() => import('./bootstrap'))
	.catch((err) => console.error(err));
