import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CounterBase } from '@angular15mf/models';

@Injectable({ providedIn: 'root' })
export class CounterNotSharedService implements CounterBase {
	readonly counter$ = new BehaviorSubject<number>(0);

	increase(): void {
		this.counter$.next(this.counter$.value + 1);
	}

	decrease(): void {
		this.counter$.next(this.counter$.value - 1);
	}
}
