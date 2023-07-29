import { Type } from '@angular/core';

/**
 * The page components that may be dynamically rendered by the InertiaRouterComponent
 */
export interface InertiaPageComponent {
  /**
   * The component string representation provided to the Inertia::render() method in Laravel
   */
  component: string,

  /**
   * The Angular component type
   */
  type: Type<unknown>,
}

/**
 * The Inertia page payload according to the Inertia protocol
 *
 * @see https://inertiajs.com/the-protocol
 */
export interface InertiaPage {
  component: string,
  props: {
    [key: string]: any,
  },
  url: string,
  version: string,
}
