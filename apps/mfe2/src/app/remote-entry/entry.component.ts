import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { COUNTER_TOKEN, CounterSharedService } from '@angular15mf/core';
import { CounterBase } from '@angular15mf/models';
import {
	CounterInfoComponent,
	CounterNotSharedService,
	CounterRxStoreService,
} from '@angular15mf/common';

@Component({
	standalone: true,
	selector: 'angular15mf-mfe2-entry',
	template: ` <div class="remote">
		<h3>MFE-2</h3>
		<angular15mf-counter-info
			[core]="counterSharedService"
			[token]="counterTokenService"
			[notShared]="counterNotSharedService"
			[rxStore]="counterRxStoreService"
		></angular15mf-counter-info>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CounterInfoComponent],
})
export class RemoteEntryComponent {
	constructor(
		@Inject(COUNTER_TOKEN) readonly counterTokenService: CounterBase,
		readonly counterSharedService: CounterSharedService,
		readonly counterNotSharedService: CounterNotSharedService,
		readonly counterRxStoreService: CounterRxStoreService
	) {}
}
