import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, ComponentRef, ElementRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: '#app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    const observer = new MutationObserver(() => {
      this.render();
    });
    observer.observe(this.elementRef.nativeElement, { attributes: true, attributeFilter: ['data-page'] });
  }

  ngAfterViewInit() {
    this.render();
  }

  render() {
    const page = JSON.parse(this.elementRef.nativeElement.dataset.page) as {
      component: string,
      props: {
        [key: string]: any,
      },
      url: string,
      version: string,
    };

    const pages = {
      'home': HomeComponent,
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
      const componentRef: ComponentRef<any> = this.container.createComponent(factory);
      Object.entries(page.props).forEach(([prop, value]) => {
        componentRef.instance[prop] = value;
      });
      this.changeDetectorRef.detectChanges();
    }
  }
}
