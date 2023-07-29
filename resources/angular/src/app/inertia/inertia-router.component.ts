import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Inject,
  InjectionToken,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { InertiaNavigationService } from './inertia-navigation.service';
import { InertiaPageComponent } from './entities';

export const INERTIA_PAGES = new InjectionToken<InertiaPageComponent>(
  'INERTIA_PAGES'
);

@Component({
  selector: 'inertia-router',
  template: '<div #container></div>',
})
export class InertiaRouterComponent {

  @ViewChild('container', { read: ViewContainerRef }) container?: ViewContainerRef;

  unsubscribe$ = new Subject<void>();

  constructor(
    private resolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private inertiaNavigationService: InertiaNavigationService,
    @Inject(INERTIA_PAGES) private pages: InertiaPageComponent[],
  ) {}

  ngAfterViewInit(): void {
    if (!this.container) {
      throw new Error('Missing view container!');
    }

    this.inertiaNavigationService.currentPage$
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(
        page => {
          const factories = this.pages.map(
            ({component, type}) => ({
              component,
              factory: this.resolver.resolveComponentFactory(type)
            }),
          );

          const factory = factories
            .find(f => f.component === page.component)
            ?.factory;

          if (factory && this.container) {
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
