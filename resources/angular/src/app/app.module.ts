import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { InertiaModule } from './inertia/inertia.module';
import { INERTIA_PAGES } from './inertia/inertia-router.component';
import { setupProgress } from "@inertiajs/core";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    InertiaModule,
  ],
  providers: [
    { provide: INERTIA_PAGES, useValue: { component: 'home', type: HomeComponent }, multi: true },
    { provide: INERTIA_PAGES, useValue: { component: 'about', type: AboutComponent }, multi: true },
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
