import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	standalone: true,
	template: 'Home',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
