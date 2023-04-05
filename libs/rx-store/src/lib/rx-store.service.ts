import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, skip } from 'rxjs/operators';
import { RxStore } from './rx-store.interface';
import { StoreObservable } from './store-observable.interface';

@Injectable()
export class RxStoreService<T> implements RxStore<T> {
	private readonly store$ = new BehaviorSubject<{
		[key in keyof T]?: T[key];
	}>({});

	private get storeSnapshot(): { [key in keyof T]?: T[key] } {
		return this.store$.getValue();
	}

	/**
	 * @description To update stream with value
	 * @param key key of updated field
	 * @param value new value by key
	 */
	set<Key extends keyof T>(key: Key, value: T[Key]): void {
		const store = this.storeSnapshot;
		store[key] = value;
		this.store$.next({ ...store });
	}

	/**
	 * @description To update stream with value (initial value must exist)
	 * @param key key of updated field
	 * @param value partial value by key
	 */
	update<Key extends keyof T>(key: Key, value: Partial<T[Key]>): void {
		const store = this.storeSnapshot;
		const prev = store[key];

		if (
			!this.isExistGuard<Key>(prev) ||
			!(prev instanceof Object) ||
			!(value instanceof Object)
		) {
			console.warn(
				`WARNING (update store ${String(
					key
				)}): Initial value must exist and extends Object`
			);
			return;
		}

		store[key] = { ...prev, ...value };
		this.store$.next(store);
	}

	/**
	 * @description To get stream with initial (or not) value
	 * @param key key of get field
	 * @param isInitial optional, if need behavior as subject (skip last value) set false
	 */
	get$<Key extends keyof T>(
		key: Key,
		isInitial: boolean = true
	): Observable<T[Key]> {
		return this.store$.pipe(
			skip(isInitial ? 0 : 1),
			map((x) => x[key]),
			filter(this.isExistGuard),
			distinctUntilChanged()
		);
	}

	/**
	 * @description To get stream with "get value" (as BehaviourSubject)
	 * @param key key of get field
	 */
	getState$<Key extends keyof T>(
		key: Key
	): StoreObservable<T[Key] | undefined> {
		return Object.assign(this.get$(key), {
			getValue: () => this.get(key),
		});
	}

	/**
	 * @description To get current value from store (return undefined if key is not existed)
	 * @param key key of get field
	 */
	get<Key extends keyof T>(key: Key): T[Key] | undefined {
		return this.storeSnapshot[key];
	}

	/**
	 * @description To clear whole store
	 */
	clear(): void {
		this.store$.next({});
	}

	/**
	 * @description To clear store value by key
	 */
	clearValue<Key extends keyof T>(key: Key): void {
		const store = { ...this.storeSnapshot };
		delete store[key];
		this.store$.next(store);
	}

	private isExistGuard<Key extends keyof T>(
		value: { [key in keyof T]?: T[key] }[Key]
	): value is T[Key] {
		return value !== undefined;
	}
}
