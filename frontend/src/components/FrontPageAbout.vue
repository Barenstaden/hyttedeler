<template>
  <v-container v-if="frontPageAbout" class="mt-5 pa-10 rounded-lg">
    <v-row>
      <h1 class="mx-auto">{{ frontPageAbout.header }}</h1>
    </v-row>
    <v-row justify="center">
      <v-col
        class="mt-16"
        v-for="selling_point in frontPageAbout.selling_points"
        :key="selling_point.icon"
        md="4"
      >
        <v-card>
          <v-img
            :lazy-src="selling_point.image.url"
            :src="selling_point.image.url"
            aspect-ratio="1"
            height="300"
          >
          </v-img>
          <v-card-title>{{ selling_point.header }}</v-card-title>
          <v-card-text>{{ selling_point.paragraph }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import gql from 'graphql-tag';
  export default {
    apollo: {
      frontPageAbout: gql`
        query {
          frontPageAbout {
            header
            secondary_header
            selling_points {
              header
              paragraph
              image {
                formats
                url
              }
            }
          }
        }
      `,
    },
  };
</script>

<style lang="scss" scoped></style>
