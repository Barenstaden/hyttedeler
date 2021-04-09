import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hjem',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/cabins',
      name: 'Mine hytter',
      component: () => import('./views/Cabins.vue'),
    },
    {
      path: '/cabins/:cabin/',
      name: 'Hytte',
      component: () => import('./views/Cabin.vue'),
      children: [
        {
          path: '',
          name: 'Oversikt',
          component: () => import('./components/cabin/Overview.vue'),
        },
        {
          path: 'calendar',
          name: 'Kalender',
          component: () => import('./components/cabin/Calendar.vue'),
        },
        {
          path: 'shopping-list',
          name: 'Handleliste',
          component: () => import('./components/cabin/ShoppingList.vue'),
        },
        {
          path: 'about',
          name: 'Om hytta',
          component: () => import('./components/cabin/About.vue'),
        },
        {
          path: 'routines',
          name: 'Faste rutiner',
          component: () => import('./components/cabin/FixedRoutines.vue'),
        },
        {
          path: 'access',
          name: 'Tilgang',
          component: () => import('./components/cabin/UserAccess.vue'),
        },
      ],
    },
    {
      path: '/profil',
      name: 'Profil',
      component: () => import('./views/Profile.vue'),
    },
  ],
  scrollBehavior: (to, from) => {
    if (from.matched[0] && from.matched[0].name != to.matched[0].name) {
      return { x: 0, y: 0 };
    }
  },
});
