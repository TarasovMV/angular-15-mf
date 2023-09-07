import { InjectionToken } from '@angular/core';
import { AppStore } from '@angular15mf/models';

export const APP_STORE = new InjectionToken<AppStore>('Global rx store');
