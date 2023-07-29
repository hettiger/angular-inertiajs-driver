import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [
    HttpClientModule
  ],
  exports: [
    InertiaRouterComponent,
    InertiaLinkDirective
  ]
})
export class InertiaModule { }
