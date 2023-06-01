import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppStore, CounterBase } from '@angular15mf/models';
import { APP_STORE } from '@angular15mf/core';

@Injectable({ providedIn: 'root' })
export class CounterRxStoreService implements CounterBase {
	readonly counter$: BehaviorSubject<number>;

	constructor(@Inject(APP_STORE) rxStore: AppStore) {
		const counter$ =
			rxStore.get('counter$') ?? new BehaviorSubject<number>(0);
		this.counter$ = counter$;
		rxStore.set('counter$', counter$);
	}

	increase(): void {
		this.counter$.next(this.counter$.value + 1);
	}

	decrease(): void {
		this.counter$.next(this.counter$.value - 1);
	}
}
