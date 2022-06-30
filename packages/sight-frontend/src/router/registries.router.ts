import { registriesResolver } from '@/resolvers/registries.resolver';
import { RouteMeta } from '@/router/router.utils';

const routes = [
  {
    path: '',
    meta: new RouteMeta({ hideInMenu: true }),
    component: () => import('@/views/registries/Index.vue'),
    beforeEnter: registriesResolver
  }
];

export default routes;
