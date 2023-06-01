import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CounterInfoComponent } from '@angular15mf/common';

import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';

@NgModule({
	declarations: [RemoteEntryComponent, CounterInfoComponent],
	imports: [CommonModule, RouterModule.forChild(remoteRoutes)],
	providers: [],
})
export class RemoteEntryModule {
	readonly rootComponent = RemoteEntryComponent;
}
