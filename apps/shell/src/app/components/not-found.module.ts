import { NgModule } from "@angular/core";
import { NotFoundComponent } from "./not-found.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [NotFoundComponent, RouterModule.forChild([{
        path: '',
        component: NotFoundComponent,
    }])],
    exports: [RouterModule],
})
export class NotFoundModule {}
