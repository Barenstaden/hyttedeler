<template>
  <v-container fluid v-if="cabin">
    <v-parallax
      class="m-0"
      height="500"
      :src="cabin.image ? cabin.image.url : `/img/cabins/${cabin.location}.jpg`"
      v-if="cabin"
    >
      <v-container>
        <v-row justify="center" align="center">
          <v-col class="text-center">
            <h1>{{ cabin.name }}</h1>
          </v-col>
        </v-row>
        <v-btn :absolute="true" class="error" rounded right bottom
          >Endre bilde</v-btn
        >
      </v-container>
    </v-parallax>

    <v-container>
      <v-row justify="center">
        <v-col xl="8">
          <v-tabs class="mx-auto" grow :centered="true">
            <v-tab :to="item.link" v-for="item in menuItems" :key="item.name">
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row justify="center">
        <v-col xl="8">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  import gql from 'graphql-tag';
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        menuItems: [
          { name: 'Oversikt', link: `./` },
          { name: 'Kalender', link: 'calendar' },
          { name: 'Handleliste', link: 'shopping-list' },
          { name: 'Faste rutiner', link: 'routines' },
          { name: 'Tilgang', link: 'access' },
        ],
      };
    },
    apollo: {
      cabin: {
        query: gql`
          query cabin($id: ID!) {
            cabin(id: $id) {
              id
              name
              location
              image {
                url
              }
              bookings {
                start
              }
            }
          }
        `,
        variables() {
          return {
            id: this.$route.params.cabin,
          };
        },
      },
    },
    watch: {
      cabin() {
        this.$store.commit('setCabin', this.cabin);
      },
    },
  };
</script>

<style>
  .v-slide-group__prev {
    display: none !important;
  }
</style>
