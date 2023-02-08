import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	standalone: true,
	template: 'Not found',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
