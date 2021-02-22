import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Hjem",
      component: () => import("./views/Landing.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/profil",
      name: "Profil",
      component: () => import("./views/Profile.vue"),
      children: [
        {
          path: "hytter",
          name: "Hytter",
          component: () => import("./components/cabin/Cabins.vue"),
        },
        {
          path: "kalender",
          name: "Kalender",
          component: () => import("./components/cabin/Calendar.vue"),
        },
        {
          path: "handleliste",
          name: "Handleliste",
          component: () => import("./components/cabin/ShoppingList.vue"),
        },
        {
          path: "om-hytta",
          name: "Om hytta",
          component: () => import("./components/cabin/About.vue"),
        },
        {
          path: "faste-rutiner",
          name: "Faste rutiner",
          component: () => import("./components/cabin/FixedRoutines.vue"),
        },
        {
          path: "tilgang",
          name: "Tilgang",
          component: () => import("./components/cabin/UserAccess.vue"),
        },
      ],
    },
  ],
  scrollBehavior: (to, from) => {
    if (from.matched[0] && from.matched[0].name != to.matched[0].name) {
      return { x: 0, y: 0 };
    }
  },
});
