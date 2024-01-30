import 'reflect-metadata';

import { InertiaMetadata, InertiaPageComponent } from './entities';

export function InertiaPage(name: string) {
  return function (target: InertiaPageComponent) {
    Reflect.defineMetadata(InertiaMetadata.component, name, target);
  }
}
