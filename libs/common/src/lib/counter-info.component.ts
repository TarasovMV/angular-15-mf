import { Component, Input } from '@angular/core';
import { CounterBase } from '@angular15mf/models';
import { CommonModule } from '@angular/common';

@Component({
	standalone: true,
	selector: 'angular15mf-counter-info',
	template: `
		<h6>Counter Info</h6>
		<ul>
			<li (click)="core.increase()">Core: {{ core.counter$ | async }}</li>
			<li (click)="token.increase()">
				Token: {{ token.counter$ | async }}
			</li>
			<li (click)="notShared.increase()">
				NotShared: {{ notShared.counter$ | async }}
			</li>
			<li (click)="rxStore.increase()">
				RxStore: {{ rxStore.counter$ | async }}
			</li>
		</ul>
	`,
	imports: [CommonModule],
})
export class CounterInfoComponent {
	@Input() core!: CounterBase;
	@Input() token!: CounterBase;
	@Input() notShared!: CounterBase;
	@Input() rxStore!: CounterBase;
}
