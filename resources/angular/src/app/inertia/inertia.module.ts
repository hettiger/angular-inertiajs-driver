import { EnvironmentProviders, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { InertiaRouterComponent } from './inertia-router.component';
import { InertiaLinkDirective } from './inertia-link.directive';
import { INERTIA_PAGES, InertiaMetadata, InertiaPageComponent } from './entities';

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
  ],
})
export class InertiaModule {
  static with(pages: InertiaPageComponent[]): ModuleWithProviders<InertiaModule> {
    return {
      ngModule: InertiaModule,
      providers: this.inertiaPageProviders(...pages),
    }
  }

  private static inertiaPageProviders(...pages: InertiaPageComponent[]): Array<Provider | EnvironmentProviders> {
    return pages
      .filter(Component => Reflect.hasMetadata(InertiaMetadata.component, Component))
      .map(Component => ({
        provide: INERTIA_PAGES,
        useValue: {
          component: Reflect.getMetadata(InertiaMetadata.component, Component),
          type: Component
        },
        multi: true
      }));
  }
}
