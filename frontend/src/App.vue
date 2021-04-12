<template>
  <v-app>
    <Navigation />
    <LoginModal v-if="!userInfo" />
    <v-main>
      <SideMenu v-if="userInfo" />
      <SuccessMessage />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'App',
    components: {
      Navigation: () => import('@/components/app/Navigation.vue'),
      SideMenu: () => import('@/components/app/SideMenu.vue'),
      LoginModal: () => import('@/components/app/LoginModal.vue'),
      SuccessMessage: () => import('@/components/app/SuccessMessage.vue'),
    },
    computed: mapGetters(['userInfo']),
  };
</script>
