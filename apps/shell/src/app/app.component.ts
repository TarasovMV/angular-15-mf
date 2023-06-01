import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, shareReplay } from 'rxjs';
import { COUNTER_TOKEN } from '@angular15mf/core';
import { CounterBase } from '@angular15mf/models';
import {
	CounterNotSharedService,
	CounterRxStoreService,
} from '@angular15mf/common';

@Component({
	selector: 'angular15mf-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	readonly activeLink$ = this.router.events.pipe(
		filter((e) => e instanceof NavigationEnd),
		map((e) => (e as NavigationEnd).url),
		shareReplay(1)
	);

	readonly links = [
		{ href: '/', label: 'Home' },
		{ href: '/mfe1', label: 'App 1' },
		{ href: '/mfe2', label: 'App 2' },
		{ href: '/lazy', label: 'Lazy' },
	] as const;

	constructor(
		@Inject(COUNTER_TOKEN) counterTokenService: CounterBase,
		counterNotSharedService: CounterNotSharedService,
		counterRxService: CounterRxStoreService,
		private readonly router: Router
	) {
		setInterval(() => {
			counterTokenService.increase();
			counterNotSharedService.increase();
			counterRxService.increase();
		}, 1000);
	}

	open(link: string): void {
		window.open(link);
	}
}
