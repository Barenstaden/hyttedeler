// =========================================================
// * Vue Material Kit - v1.2.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-kit
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-kit/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import store from "./store";
import apolloProvider from "./apollo";
import { LayoutPlugin, ListGroupPlugin } from "bootstrap-vue";
Vue.use(LayoutPlugin);
Vue.use(ListGroupPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import AnimateCSS from "animate.css";
Vue.use(AnimateCSS);

Vue.use(Vuex);

import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);

import VCalendar from "v-calendar";

Vue.use(VCalendar);

const NavbarStore = {
  showNavbar: false,
};

Vue.mixin({
  data() {
    return {
      NavbarStore,
    };
  },
});

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
