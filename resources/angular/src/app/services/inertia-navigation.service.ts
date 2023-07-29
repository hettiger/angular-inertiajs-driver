import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Page {
  component: string,
  props: {
    [key: string]: any,
  },
  url: string,
  version: string,
}

@Injectable({
  providedIn: 'root'
})
export class InertiaNavigationService {

  currentPage$ = new BehaviorSubject<Page>(JSON.parse(document.getElementById('app')!.dataset['page']!));

  private readonly version: string;

  constructor(
    private httpClient: HttpClient
  ) {
    window.addEventListener('popstate', () => {
      if ('type' in history.state && history.state.type === 'inertia') {
        this.currentPage$.next(history.state.page);
      }
    });

    this.version = this.currentPage$.getValue().version;
  }

  navigate(href: string) {
    return this.httpClient
      .get<Page>(href, {
        headers: {
          'X-Inertia': 'true',
          'X-Inertia-Version': this.version,
        }
      })
      .pipe(
        distinctUntilChanged(),
        tap(page => {
          this.currentPage$.next(page);

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
