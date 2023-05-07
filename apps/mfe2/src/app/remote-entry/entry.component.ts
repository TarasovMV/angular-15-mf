import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	standalone: true,
	selector: 'angular15mf-mfe2-entry',
	template: `<div class="remote">
        <h3>MFE-2</h3>
    </div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {}
