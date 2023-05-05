import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, shareReplay } from 'rxjs';

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
		{ href: '/mfe1', label: 'Mfe1' },
		{ href: '/mfe2', label: 'Mfe2' },
		{ href: '/lazy/mfe1', label: 'Mfe1 Lazy' },
		{ href: '/lazy/mfe2', label: 'Mfe2 Lazy' },
		{ href: '/lazy/not-found', label: 'Lazy not found' },
	] as const;

	constructor(private readonly router: Router) {}
}
