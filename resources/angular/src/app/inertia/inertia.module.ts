import { NgModule } from '@angular/core';
import { InertiaLinkDirective } from './inertia-link.directive';
import { InertiaRouterComponent } from './inertia-router.component';
import { InertiaNavigationService } from './inertia-navigation.service';



@NgModule({
  declarations: [
    InertiaRouterComponent,
    InertiaLinkDirective
  ],
  providers: [
    InertiaNavigationService
  ],
  exports: [
    InertiaRouterComponent,
    InertiaLinkDirective
  ]
})
export class InertiaModule { }
