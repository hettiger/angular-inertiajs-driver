import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { setupProgress } from "@inertiajs/core";

import { AppComponent } from './app.component';
import { PAGES } from './pages';
import { InertiaModule } from './inertia/inertia.module';

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES,
  ],
  imports: [
    BrowserModule,
    InertiaModule.with(PAGES),
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
  constructor() {
    const isServer = typeof window === 'undefined';

    if (!isServer) {
      setupProgress({
        delay: 0,
        color: 'salmon',
        includeCSS: true,
        showSpinner: false,
      });
    }
  }
}
