import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  Inject,
  InjectionToken, Optional,
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
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private inertiaNavigationService: InertiaNavigationService,
    @Optional() @Inject(INERTIA_PAGES) private pages?: InertiaPageComponent[],
  ) {}

  ngAfterViewInit(): void {
    this.inertiaNavigationService.currentPage$
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(
        page => {
          if (!this.container) {
            throw new Error('Missing view container!');
          }

          const component = this.pages?.find(
            p => p.component === page.component
          );

          if (component) {
            this.container.clear();
            const componentRef: ComponentRef<any> = this.container.createComponent(component.type);
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
