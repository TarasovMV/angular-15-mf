import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_STORE, COUNTER_TOKEN } from '@angular15mf/core';
import { CounterNotSharedService } from '@angular15mf/common';
import { RxStoreService } from '@angular15mf/rx-store';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
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
