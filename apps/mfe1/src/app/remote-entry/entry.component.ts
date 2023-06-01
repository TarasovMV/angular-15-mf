import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { COUNTER_TOKEN } from '@angular15mf/core';
import { CounterBase } from '@angular15mf/models';
import {
	CounterNotSharedService,
	CounterRxStoreService,
} from '@angular15mf/common';

@Component({
	selector: 'angular15mf-mfe1-entry',
	template: `<div class="remote">
		<h3>MFE-1</h3>
		<angular15mf-counter-info
			[token]="counterTokenService.counter$ | async"
			[notShared]="counterNotSharedService.counter$ | async"
			[rxStore]="counterRxStoreService.counter$ | async"
		></angular15mf-counter-info>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {
	constructor(
		@Inject(COUNTER_TOKEN) readonly counterTokenService: CounterBase,
		readonly counterNotSharedService: CounterNotSharedService,
		readonly counterRxStoreService: CounterRxStoreService
	) {}
}
