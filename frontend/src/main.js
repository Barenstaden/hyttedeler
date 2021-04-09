import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex';
import store from './store';
import apolloProvider from './apollo';
import vuetify from './plugins/vuetify';
import moment from 'moment';
Vue.use(Vuex);
moment.locale('nb');
moment.suppressDeprecationWarnings = true;
Vue.use(moment);
Vue.config.productionTip = false;

import axios from 'axios';
Vue.mixin({
  methods: {
    prettifyTime(time) {
      return moment(new Date(time)).calendar(null, { lastWeek: 'L' });
    },
  },
});

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
