import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, mergeMap, Observable, Subject, takeUntil } from 'rxjs';
import { InertiaNavigationService } from '../services/inertia-navigation.service';

@Directive({
  selector: '[inertiaLink]'
})
export class InertiaLinkDirective implements OnInit, OnDestroy {

  @Input('inertiaLink') href = '';

  click$: Observable<MouseEvent>;
  unsubscribe$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private inertiaNavigationService: InertiaNavigationService,
  ) {
    this.click$ = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click', { capture: true });
  }

  ngOnInit(): void {
    this.click$
      .pipe(
        takeUntil(this.unsubscribe$),
        mergeMap((event) => {
          event.stopImmediatePropagation();
          event.preventDefault();

          return this.inertiaNavigationService.navigate(this.href);
        })
      )
      .subscribe();
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

}
