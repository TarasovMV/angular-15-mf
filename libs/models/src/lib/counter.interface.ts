import { Observable } from 'rxjs';

export interface CounterBase {
	counter$: Observable<number>;
	increase: () => void;
	decrease: () => void;
}
