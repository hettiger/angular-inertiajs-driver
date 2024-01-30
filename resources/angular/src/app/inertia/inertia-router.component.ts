import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  Inject,
  Optional,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { router } from "@inertiajs/core";

import { INERTIA_PAGES, InertiaPage } from './entities';

@Component({
  selector: 'inertia-router',
  template: '<div #container></div>',
})
export class InertiaRouterComponent {

  @ViewChild('container', { read: ViewContainerRef }) container?: ViewContainerRef;

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(INERTIA_PAGES) private pages?: InertiaPage[],
  ) {}

  ngAfterViewInit(): void {
    router.init({
      initialPage: JSON.parse(document.getElementById('app')!.dataset['page']!),
      resolveComponent: name => this.pages?.find(
        p => p.component === name
      )?.type,
      swapComponent: async ({component, page, preserveState}) => {
        if (!this.container) {
          throw new Error('Missing view container!');
        }

        if (component) {
          this.container.clear();
          const componentRef: ComponentRef<any> = this.container.createComponent(component as Type<unknown>);
          Object.entries(page.props).forEach(([prop, value]) => {
            componentRef.instance[prop] = value;
          });
          this.changeDetectorRef.detectChanges();
        }
      }
    });
  }
}
