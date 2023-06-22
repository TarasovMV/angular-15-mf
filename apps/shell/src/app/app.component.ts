import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	InjectionToken,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, shareReplay } from 'rxjs';
import { COUNTER_TOKEN, CounterSharedService } from '@angular15mf/core';
import { CounterBase } from '@angular15mf/models';
import {
	CounterNotSharedService,
	CounterRxStoreService,
} from '@angular15mf/common';

const COUNTERS = new InjectionToken<CounterBase>('counters');
const counterProviders = [
	COUNTER_TOKEN,
	CounterSharedService,
	CounterNotSharedService,
	CounterRxStoreService,
].map((i) => ({
	provide: COUNTERS,
	useExisting: i,
	multi: true,
}));

@Component({
	selector: 'angular15mf-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	providers: [...counterProviders],
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
		@Inject(COUNTERS) counters: CounterBase[],
		private readonly router: Router
	) {
		setInterval(() => {
			counters.forEach((c) => c.increase());
		}, 1000);
	}

	open(link: string): void {
		window.open(link);
	}
}
