import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'angular15mf-mfe1-entry',
	template: `<div class="remote">
        <h3>MFE-1</h3>
    </div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {}
