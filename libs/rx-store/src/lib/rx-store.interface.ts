import { Observable } from 'rxjs';
import { StoreObservable } from './store-observable.interface';

export interface RxStore<T> {
    set: <Key extends keyof T>(key: Key, value: T[Key]) => void;
    update: <Key extends keyof T>(key: Key, value: Partial<T[Key]>) => void;
    get$: <Key extends keyof T>(
        key: Key,
        isInitial: boolean
    ) => Observable<T[Key]>;
    getState$: <Key extends keyof T>(
        key: Key
    ) => StoreObservable<T[Key] | undefined>;
    get: <Key extends keyof T>(key: Key) => T[Key] | undefined;
    clear: () => void;
    clearValue: <Key extends keyof T>(key: Key) => void;
}
