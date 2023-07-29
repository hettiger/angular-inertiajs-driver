import { NgModule } from '@angular/core';
import { InertiaLinkDirective } from './directives/inertia-link.directive';
import { InertiaRouterComponent } from './components/inertia-router/inertia-router.component';
import { InertiaNavigationService } from './services/inertia-navigation.service';



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
