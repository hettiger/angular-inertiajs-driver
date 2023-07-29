import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { InertiaPage } from './entities';

@Injectable()
export class InertiaNavigationService {

  get currentPage$() {
    return this._currentPage$.asObservable();
  }

  private readonly _currentPage$: BehaviorSubject<InertiaPage>;
  private readonly version: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this._currentPage$ = new BehaviorSubject(
      JSON.parse(document.getElementById('app')!.dataset['page']!)
    );

    this.version = this._currentPage$.getValue().version;

    window.addEventListener('popstate', () => {
      if ('type' in history.state && history.state.type === 'inertia') {
        this._currentPage$.next(history.state.page);
      }
    });
  }

  navigate(href: string) {
    return this.httpClient
      .get<InertiaPage>(href, {
        headers: {
          'X-Inertia': 'true',
          'X-Inertia-Version': this.version,
        }
      })
      .pipe(
        distinctUntilChanged(),
        tap(page => {
          this._currentPage$.next(page);

          history.pushState(
            {
              type: 'inertia',
              page
            },
            '',
            href,
          );
        })
      );
  }
}
