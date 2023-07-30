import { Directive, HostListener, Input } from '@angular/core';
import { router } from "@inertiajs/core";

@Directive({
  selector: '[inertiaLink]'
})
export class InertiaLinkDirective {

  @Input('inertiaLink') href = '';

  @HostListener('click') onClick() {
    router.get(this.href);
  }
}
