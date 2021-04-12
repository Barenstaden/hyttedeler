<template>
  <v-container v-if="cabin">
    <v-row>
      <v-col>
        <h1>{{ cabin.name }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <!-- Bookings -->
      <v-col md="4">
        <v-card>
          <v-card-text>
            <v-card-title>
              {{ sortedBookings.length }} planlagte turer
            </v-card-title>
            <v-card-subtitle v-if="!sortedBookings.length">
              Ingen planlagte turer
            </v-card-subtitle>
          </v-card-text>

          <v-timeline align-top dense v-if="sortedBookings.length">
            <v-timeline-item
              v-for="booking in sortedBookings"
              :key="booking.id"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong
                    >{{ prettifyTime(booking.start) }} -
                    {{ prettifyTime(booking.end) }}</strong
                  >
                </div>
                <div>
                  {{ bookingLength(booking) }} dager · {{ booking.user.name }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>

          <v-row class="mt-5 pb-8">
            <v-btn small rounded class="primary mx-auto" to="calendar"
              >Legg til en tur</v-btn
            >
          </v-row>
        </v-card>
      </v-col>

      <!-- Shopping list -->
      <v-col md="4">
        <v-card>
          <v-card-text>
            <v-card-title>
              Handleliste
            </v-card-title>
            <v-card-subtitle>
              Ingen varer
            </v-card-subtitle>
            <v-list>
              <v-list-item v-for="item in notPurchasedItem" :key="item.id">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.item }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-btn small rounded class="primary mx-auto" to="shopping-list"
                  >Gå til handleliste</v-btn
                >
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Users -->
      <v-col md="4" v-if="cabin.users.length">
        <v-card>
          <v-card-text>
            <v-card-title>
              Brukere
            </v-card-title>
            <v-list-item v-for="user in cabin.users" :key="user.id">
              <v-list-item-content>
                <v-list-item-title>
                  {{ user.name }}
                  <span v-if="user.id == userInfo.id">(deg)</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-btn
                v-if="cabin.owner.id == userInfo.id"
                small
                rounded
                class="primary mx-auto"
                to="access"
                >Administrer brukere</v-btn
              >
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import gql from 'graphql-tag';
  import moment from 'moment';
  import { mapGetters } from 'vuex';
  export default {
    apollo: {
      cabin: {
        query: gql`
          query cabin($id: ID!) {
            cabin(id: $id) {
              id
              name
              owner {
                id
              }
              bookings {
                id
                start
                end
                user {
                  name
                }
              }
              shopping_list {
                item
                purchased
                id
              }
              users {
                id
                name
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
    methods: {
      bookingLength(booking) {
        return moment(booking.end).diff(booking.start, 'days');
      },
    },
    computed: {
      ...mapGetters(['userInfo']),
      sortedBookings() {
        return this.cabin.bookings
          .filter((booking) => moment(booking.start).isAfter(new Date()))
          .sort((a, b) => {
            return moment(a.start).isAfter(b.start) ? 0 : -1;
          });
      },
      notPurchasedItem() {
        return this.cabin.shopping_list.filter((item) => !item.purchased);
      },
    },
  };
</script>

<style></style>
