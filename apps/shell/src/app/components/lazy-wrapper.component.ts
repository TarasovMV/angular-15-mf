import {
	ChangeDetectionStrategy,
	Component,
	createNgModule,
	OnDestroy,
	Type,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { ActivatedRoute } from '@angular/router';
import { MfeManifest } from '../../utils/load-mfe-manifest.util';
import { Subject, takeUntil } from 'rxjs';

@Component({
	standalone: true,
	template: `
		<h1>Programmatic Loading</h1>
		<div>
			<button (click)="load()">Load!</button>
		</div>
		<div #vcRef></div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyWrapperComponent implements OnDestroy {
	@ViewChild('vcRef', { read: ViewContainerRef }) vcRef!: ViewContainerRef;
	private app = '';
	private readonly destroy$ = new Subject<void>();

	constructor(route: ActivatedRoute) {
		route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
			this.vcRef?.clear();
			this.app = params.get('app') ?? '';
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	async load() {
		if (MfeManifest.checkApp(this.app)) {
			const m = await loadRemoteModule(MfeManifest.getOptions(this.app));
			const entity = m[MfeManifest.getEntity(this.app)];

			const component =
				MfeManifest.getType(this.app) === 'component'
					? entity
					: createNgModule<{ rootComponent: Type<unknown> }>(entity)
							.instance.rootComponent;

			this.vcRef.createComponent(component);

			return;
		}

		const component = (await import('./not-found.component'))
			.NotFoundComponent;
		this.vcRef.createComponent(component);
	}
}
