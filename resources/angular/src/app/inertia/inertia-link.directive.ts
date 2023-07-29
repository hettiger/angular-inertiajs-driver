import { Directive, HostListener, Input } from '@angular/core';
import { InertiaNavigationService } from './inertia-navigation.service';

@Directive({
  selector: '[inertiaLink]'
})
export class InertiaLinkDirective {

  @Input('inertiaLink') href = '';

  constructor(
    private inertiaNavigationService: InertiaNavigationService
  ) {}

  @HostListener('click') onClick() {
    this.inertiaNavigationService.navigate(this.href).subscribe();
  }
}
