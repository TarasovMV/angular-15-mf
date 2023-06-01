import { Component, Input } from '@angular/core';

@Component({
	selector: 'angular15mf-counter-info',
	templateUrl: './counter-info.component.html',
	styleUrls: ['./counter-info.component.less'],
})
export class CounterInfoComponent {
	@Input() core: number | null = 0;
	@Input() token: number | null = 0;
	@Input() notShared: number | null = 0;
	@Input() rxStore: number | null = 0;
}
