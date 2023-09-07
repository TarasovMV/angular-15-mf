import { Inject, Injectable } from '@angular/core';
import { AppStore, CounterBase } from '@angular15mf/models';
import { APP_STORE } from '@angular15mf/core';

const KEY = 'counter';

@Injectable({ providedIn: 'root' })
export class CounterRxStoreService implements CounterBase {
	readonly counter$ = this.rxStore.get$(KEY);

	private get currentValue(): number {
		return this.rxStore.get(KEY) ?? 0;
	}

	constructor(@Inject(APP_STORE) private readonly rxStore: AppStore) {
		console.log('start');
	}

	increase(): void {
		this.rxStore.set(KEY, this.currentValue + 1);
	}

	decrease(): void {
		this.rxStore.set(KEY, this.currentValue - 1);
	}
}
