import { InjectionToken, Type } from '@angular/core';

export const INERTIA_PAGES = new InjectionToken<InertiaPage>('INERTIA_PAGES');

export enum InertiaMetadata {
  component = 'inertia:component'
}

/**
 * The Angular component type
 */
export type InertiaPageComponent = Type<unknown>;

/**
 * The pages that may be dynamically rendered by the InertiaRouterComponent
 */
export interface InertiaPage {
  /**
   * The component string representation provided to the Inertia::render() method in Laravel
   */
  component: string,

  /**
   * The Angular component type
   */
  type: InertiaPageComponent,
}
