import { BehaviorSubject } from 'rxjs';

/**
 * Содержит пары ключ - интерфейс для значений глобального стора
 */
export interface AppStoreDescriptor {
	sharedMessage: string;
	counter$: BehaviorSubject<number>;
}
