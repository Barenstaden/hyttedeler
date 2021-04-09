<template>
  <v-navigation-drawer
    fixed
    bottom
    temporary
    v-model="toggleSideMenu"
    v-if="self"
  >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img
            :src="userInfo.image ? userInfo.image.url : '/img/cabins/small.jpg'"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ userInfo.name }}</v-list-item-title>
          <v-list-item-subtitle @click="signOut">Logg ut</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item to="/profile" link>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profil</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item to="/new-cabin" link>
        <v-list-item-icon>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Ny hytte</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link to="/cabins">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Mine hytter</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        :to="`/cabins/${cabin.id}/`"
        link
        v-for="cabin in self.cabins"
        :key="cabin.id"
      >
        <v-list-item-content>
          <v-list-item-title>{{ cabin.name }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex';
  import gql from 'graphql-tag';
  export default {
    apollo: {
      self: gql`
        query {
          self {
            id
            cabins {
              id
              name
              image {
                url
              }
            }
          }
        }
      `,
    },
    methods: {
      signOut() {
        this.$store.commit('signOut');
      },
    },
    computed: {
      ...mapGetters(['sideMenu', 'userInfo']),
      toggleSideMenu: {
        get() {
          return this.sideMenu;
        },
        set() {
          return this.$store.commit('toggleSideMenu');
        },
      },
    },
  };
</script>

<style></style>
