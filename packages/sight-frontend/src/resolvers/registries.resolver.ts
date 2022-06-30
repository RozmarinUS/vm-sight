import { NavigationGuardNext, Route, RouteMeta } from 'vue-router';
import registriesService from '@/services/registries.service';

export const registriesResolver = (to: Route, from: Route, next: NavigationGuardNext) => {
  const meta = to.meta as RouteMeta;
  registriesService.getRegistries().then(registries => {
    meta.registries = registries;
    next();
  }).catch(() => {
    next();
  });
};
