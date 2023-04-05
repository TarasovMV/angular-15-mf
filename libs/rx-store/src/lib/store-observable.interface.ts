import { Observable } from 'rxjs';

export interface StoreObservable<T> extends Observable<T> {
    getValue: () => T;
}
