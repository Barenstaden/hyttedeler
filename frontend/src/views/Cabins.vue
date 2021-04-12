<template>
  <v-container>
    <v-row v-if="self">
      <v-col cols="12" class="text-center mt-10">
        <h1>Mine hytter</h1>
      </v-col>

      <v-col md="4" v-for="cabin in self.cabins" :key="cabin.id">
        <v-card @click="setSelectedCabin(cabin)">
          <v-img
            v-if="cabin.image"
            :src="cabin.image.url"
            height="250"
            cover
          ></v-img>
          <v-img
            v-else
            :src="`/img/cabins/${cabin.location}.jpg`"
            height="250"
            cover
          ></v-img>
          <v-card-title>{{ cabin.name }}</v-card-title>
          <v-card-text>
            <span v-if="upcomingBookings(cabin)">{{
              upcomingBookings(cabin) > 1
                ? upcomingBookings(cabin) + ' planlagte turer'
                : 'Én planlagt tur'
            }}</span>
            <span v-else>Ingen planlagte turer</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="4" :offset-md="self.cabins.length ? '' : '4'">
        <NewCabin @cabinAdded="proceedToCabin" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import moment from 'moment';
  import gql from 'graphql-tag';
  export default {
    components: {
      NewCabin: () => import('@/components/cabin/NewCabin.vue'),
    },
    apollo: {
      self: gql`
        query {
          self {
            cabins {
              id
              location
              name
              image {
                url
              }
              users {
                id
              }
              bookings {
                start
              }
            }
          }
        }
      `,
    },
    methods: {
      setSelectedCabin(cabin) {
        this.$router.push('/cabins/' + cabin.id + '/');
      },
      days(booking) {
        return moment(booking.end).diff(booking.start, 'days');
      },
      upcomingBookings(cabin) {
        return cabin.bookings.filter((booking) =>
          moment(booking.start).isAfter(new Date()),
        ).length;
      },
      proceedToCabin(cabin) {
        console.log(cabin);
        this.self.cabins.push(cabin);
        this.$router.push(`/cabins/${cabin.id}/`);
      },
    },
    computed: {
      ...mapGetters(['selectedCabin', 'newUser']),
    },
  };
</script>

<style></style>
