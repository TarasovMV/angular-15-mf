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
			<button class="custom-btn" (click)="load('mfe1')">
				Load App 1
			</button>
			<button class="custom-btn space_left-2" (click)="load('mfe2')">
				Load App 2
			</button>
		</div>
		<div #vcRef></div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyWrapperComponent {
	@ViewChild('vcRef', { read: ViewContainerRef }) vcRef!: ViewContainerRef;

	async load(app: string) {
		this.vcRef?.clear();

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

			this.vcRef.createComponent(component);
		} catch {
			const component = (await import('./not-found.component'))
				.NotFoundComponent;
			this.vcRef.createComponent(component);
		}
	}
}
