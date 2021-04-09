<template>
  <v-app>
    <Navigation />
    <LoginModal />
    <v-main>
      <SideMenu />
      <SuccessMessage />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {
      Navigation: () => import('@/components/app/Navigation.vue'),
      SideMenu: () => import('@/components/app/SideMenu.vue'),
      LoginModal: () => import('@/components/app/LoginModal.vue'),
      SuccessMessage: () => import('@/components/app/SuccessMessage.vue'),
    },
    data: () => ({
      //
    }),
  };
</script>
