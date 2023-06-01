import { BehaviorSubject } from 'rxjs';

export interface CounterBase {
	counter$: BehaviorSubject<number>;
	increase: () => void;
	decrease: () => void;
}
