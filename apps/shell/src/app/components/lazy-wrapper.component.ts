import {
	ChangeDetectionStrategy,
	Component,
	createNgModule,
	Type,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { MfeManifest } from '../../utils/load-mfe-manifest.util';

@Component({
	standalone: true,
	template: `
		<h3>Script loading</h3>
		<div class="space_top-2 space_bottom-4">
			<button class="custom-btn" (click)="load('mfe1', vcRef1)">
				Load App 1
			</button>
			<button
				class="custom-btn space_left-2"
				(click)="load('mfe2', vcRef2)"
			>
				Load App 2
			</button>
		</div>
		<div style="display: flex; gap: .25rem">
			<div style="flex: 1;">
				<div #vcRefTpl1></div>
			</div>
			<div style="flex: 1;">
				<div #vcRefTpl2></div>
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyWrapperComponent {
	@ViewChild('vcRefTpl1', { read: ViewContainerRef })
	readonly vcRef1!: ViewContainerRef;
	@ViewChild('vcRefTpl2', { read: ViewContainerRef })
	readonly vcRef2!: ViewContainerRef;

	async load(app: string, vcRef: ViewContainerRef) {
		vcRef?.clear();

		if (!MfeManifest.checkApp(app)) {
			return;
		}

		try {
			const m = await loadRemoteModule(MfeManifest.getOptions(app));
			const entity = m[MfeManifest.getEntity(app)];

			const component =
				MfeManifest.getType(app) === 'component'
					? entity
					: createNgModule<{ rootComponent: Type<unknown> }>(entity)
							.instance.rootComponent;

			vcRef.createComponent(component).hostView.markForCheck();
		} catch {
			const component = (await import('./not-found.component'))
				.NotFoundComponent;
			vcRef.createComponent(component);
		}
	}
}
