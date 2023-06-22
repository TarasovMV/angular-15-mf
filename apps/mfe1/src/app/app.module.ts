import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_STORE, COUNTER_TOKEN } from '@angular15mf/core';
import { CounterNotSharedService } from '@angular15mf/common';
import { RxStoreService } from '@angular15mf/rx-store';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
				{
					path: '',
					loadChildren: () =>
						import('./remote-entry/entry.module').then(
							(m) => m.RemoteEntryModule
						),
				},
			],
			{ initialNavigation: 'enabledBlocking' }
		),
	],
	providers: [
		{
			provide: COUNTER_TOKEN,
			useClass: CounterNotSharedService,
		},
		{
			provide: APP_STORE,
			useClass: RxStoreService,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
