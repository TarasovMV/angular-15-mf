import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'angular15mf-root',
	template: '<router-outlet></router-outlet>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
