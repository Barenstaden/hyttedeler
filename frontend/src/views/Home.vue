<template>
  <div>
    <v-parallax
      id="frontPage"
      height="500"
      v-if="frontPage"
      :src="frontPage.background.url"
    >
      <v-container fluid>
        <v-row>
          <div class="mx-auto">
            <h1>{{ frontPage.main_header }}</h1>
            <v-btn rounded class="mt-3" color="error">
              {{ frontPage.main_button }}
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-parallax>
    <FrontPageAbout />
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  export default {
    name: 'Home',
    components: {
      FrontPageAbout: () => import('@/components/FrontPageAbout.vue'),
    },
    apollo: {
      frontPage: {
        query: gql`
          query {
            frontPage {
              main_header
              secondary_header
              main_button
              background {
                url
              }
            }
          }
        `,
      },
    },
  };
</script>
