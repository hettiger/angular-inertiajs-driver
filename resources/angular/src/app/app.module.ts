import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { InertiaModule } from './inertia/inertia.module';
import { INERTIA_PAGES } from './inertia/inertia-router.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InertiaModule,
  ],
  providers: [
    { provide: INERTIA_PAGES, useValue: { component: 'home', type: HomeComponent }, multi: true },
    { provide: INERTIA_PAGES, useValue: { component: 'about', type: AboutComponent }, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
