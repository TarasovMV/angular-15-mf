import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { APP_STORE, COUNTER_TOKEN } from '@angular15mf/core';
import { CounterNotSharedService } from '@angular15mf/common';
import { RxStoreService } from '@angular15mf/rx-store';

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
