<template>
  <v-container v-if="cabin">
    <v-row justify="center">
      <v-sheet>
        <v-toolbar flat>
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>

          <v-toolbar-title v-else>
            {{ currentMonth }}
          </v-toolbar-title>

          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-toolbar>
      </v-sheet>
    </v-row>
    <v-row>
      <v-calendar
        interval-height="100"
        ref="calendar"
        type="month"
        mode="stack"
        v-model="value"
        :events="filteredBookings"
        @click:date="addBooking"
        @click:event="showEvent"
      >
      </v-calendar>

      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card
          v-if="selectedBooking"
          color="grey lighten-4"
          min-width="350px"
          flat
        >
          <v-toolbar>
            <v-toolbar-title
              v-html="selectedBooking.user.name"
            ></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            {{ prettifyTime(selectedBooking.start) }} -
            {{ prettifyTime(selectedBooking.end) }}
          </v-card-text>
          <v-card-actions>
            <v-btn small rounded color="primary" @click="selectedOpen = false">
              Lukk
            </v-btn>
            <v-btn
              small
              rounded
              color="error"
              @click="deleteBooking(selectedBooking.id)"
            >
              Slett
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-row>
    <v-row justify="end">
      <v-btn
        :disabled="!selectedStart && !selectedEnd"
        small
        rounded
        class="success mt-4 mr-3"
        @click="updateBookings(cabin.bookings)"
        >Lagre</v-btn
      >
      <v-btn small rounded class="error mt-4" @click="addBooking(null)"
        >Fjern valg</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
  import gql from 'graphql-tag';
  import moment from 'moment';
  import { mapActions, mapGetters } from 'vuex';
  import axios from 'axios';
  export default {
    data() {
      return {
        selectedOpen: false,
        selectedBooking: null,
        selectedElement: null,
        value: '',
        currentMonth: moment().format('MMMM YYYY'),
        selectedStart: null,
        selectedEnd: null,
      };
    },
    methods: {
      ...mapActions(['updateCabin']),
      addBooking(date) {
        if (!date) {
          this.selectedStart = null;
          this.selectedEnd = null;
        }
        if (!this.selectedStart && !this.selectedEnd && date) {
          this.selectedStart = moment(date.date);
          this.selectedEnd = moment(date.date);
        } else if (
          this.selectedStart &&
          moment(date.date).isAfter(this.selectedStart)
        ) {
          this.selectedEnd = moment(date.date);
        } else if (
          this.selectedStart &&
          moment(date.date).isBefore(this.selectedStart)
        ) {
          this.selectedStart = moment(date.date);
        }
        this.cabin.bookings = this.cabin.bookings.filter(
          (booking) => !booking.new,
        );
        if (this.selectedStart && this.selectedEnd) {
          this.cabin.bookings.push({
            start: this.selectedStart,
            end: this.selectedEnd,
            user: this.userInfo,
            new: true,
          });
        }
      },
      async updateBookings(bookings) {
        const response = await this.updateCabin({
          bookings: bookings,
        });
        this.cabin.bookings = response.bookings;
        this.addBooking(null);
      },
      deleteBooking(id) {
        const bookings = this.cabin.bookings.filter(
          (booking) => booking.id != id,
        );
        this.updateBookings(bookings);
        this.selectedOpen = false;
      },
      showEvent({ nativeEvent, event }) {
        this.selectedBooking = event;
        this.selectedElement = nativeEvent.target;
        this.selectedOpen = true;
      },
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
                id
                start
                end
                user {
                  id
                  name
                }
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
    computed: {
      ...mapGetters(['userInfo', 'token']),
      filteredBookings() {
        return this.cabin.bookings.filter((booking) => {
          booking.start = moment(booking.start).format('YYYY-MM-DD');
          booking.end = moment(booking.end).format('YYYY-MM-DD');
          booking.name = booking.user.name;
          return booking;
        });
      },
    },
  };
</script>

<style></style>
