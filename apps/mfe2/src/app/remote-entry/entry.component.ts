import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	standalone: true,
	selector: 'angular15mf-mfe2-entry',
	template: `MFE-2`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {}
