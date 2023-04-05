import { InjectionToken } from '@angular/core';
import { RxStoreService } from '@angular15mf/rx-store';
import { AppStore, AppStoreDescriptor } from '@angular15mf/models';

export const APP_STORE = new InjectionToken<AppStore>('Global rx store', {
	providedIn: 'root',
	factory: () => new RxStoreService<AppStoreDescriptor>(),
});
