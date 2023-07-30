import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { InertiaLinkDirective } from './inertia-link.directive';
import { InertiaRouterComponent } from './inertia-router.component';

@NgModule({
  declarations: [
    InertiaRouterComponent,
    InertiaLinkDirective
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
