import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { InertiaNavigationService } from './inertia-navigation.service';
import { HomeComponent } from '../pages/home/home.component';
import { AboutComponent } from '../pages/about/about.component';

@Component({
  selector: 'inertia-router',
  template: '<div #container></div>',
})
export class InertiaRouterComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  unsubscribe$ = new Subject<void>();

  constructor(
    private resolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private inertiaNavigationService: InertiaNavigationService
  ) {}

  ngAfterViewInit(): void {
    this.inertiaNavigationService.currentPage$
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(
        page => {
          const pages = {
            'home': HomeComponent,
            'about': AboutComponent,
          };

          const factories = Object.entries(pages).map(
            ([component, type]) => ({
              component,
              factory: this.resolver.resolveComponentFactory(type)
            }),
          );

          const factory = factories
            .find(f => f.component === page.component)
            ?.factory;

          if (factory) {
            this.container.clear();
            const componentRef: ComponentRef<any> = this.container.createComponent(factory);
            Object.entries(page.props).forEach(([prop, value]) => {
              componentRef.instance[prop] = value;
            });
            this.changeDetectorRef.detectChanges();
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
