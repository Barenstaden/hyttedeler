<template>
  <v-app-bar app color="error" dark>
    <v-app-bar-nav-icon @click="toggleSideMenu"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <v-btn text to="/">Hyttedeler</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="!userInfo">
      <v-btn rounded class="success" @click="loginModal">
        Logg inn
      </v-btn>
    </div>
    <div v-else>
      <v-btn fab x-small rounded to="/profile">
        <v-avatar>
          <v-icon dark>
            mdi-account
          </v-icon>
        </v-avatar>
      </v-btn>
      <v-btn rounded small class="primary btn-sm ml-3" @click="signOut">
        Logg ut
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    created() {
      if (this.token) this.fetchUserInfo();
    },
    methods: {
      ...mapActions(['fetchUserInfo']),
      loginModal() {
        this.$store.commit('toggleLoginModal', true);
      },
      signOut() {
        this.$store.commit('signOut');
      },
      toggleSideMenu() {
        this.$store.commit('toggleSideMenu', !this.sideMenu);
      },
    },
    computed: mapGetters(['userInfo', 'sideMenu', 'token']),
    watch: {
      token() {
        if (!this.userInfo) this.fetchUserInfo();
      },
      userInfo() {
        if (!this.userInfo.name) this.$store.commit('setNewUser', true);
      },
    },
  };
</script>

<style></style>
