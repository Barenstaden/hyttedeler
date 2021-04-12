<template>
  <v-container v-if="cabin">
    <v-row justify="center">
      <v-col md="6">
        <v-card>
          <v-card-title>
            Brukere av hytta
          </v-card-title>
          <v-list-item v-for="user in cabin.users" :key="user.id">
            <v-list-item-content>
              {{ user.name ? user.name : user.email }}
            </v-list-item-content>
          </v-list-item>

          <!-- Legg til bruker -->
          <v-list-item>
            <v-list-item-content>
              <v-form @submit.prevent="addUser">
                <v-text-field
                  outlined
                  label="Legg til en bruker"
                  type="email"
                  append-outer-icon="mdi-plus"
                  @click:append-outer="submitAddUser"
                  hint="Skriv inn e-posten til brukeren du ønsker å legge til"
                  v-model="userToAdd"
                >
                </v-text-field>
              </v-form>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import gql from 'graphql-tag';
  import axios from 'axios';
  import { mapActions, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        userToAdd: '',
      };
    },
    apollo: {
      cabin: {
        query: gql`
          query cabin($id: ID!) {
            cabin(id: $id) {
              id
              users {
                id
                name
                email
                confirmed
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
      ...mapActions(['update', 'checkIfUserExists', 'register']),
      async submitAddUser() {
        const userId = await this.checkIfUserExists(this.userToAdd);
        if (!userId) {
          const response = await this.register({
            email: this.userToAdd,
            password: this.token,
            added_by: this.userInfo.id,
          });
          this.addUser(response.data.user.id);
        } else {
          this.addUser(userId);
        }
      },
      async addUser(id) {
        const users = this.cabin.users.reduce((arr, user) => {
          arr.push(user.id);
          return arr;
        }, []);
        users.push(id);
        console.log(users);
        const userAdded = await this.update({
          url: 'cabins',
          data: {
            users: users,
          },
        });
        this.userToAdd = '';
        this.$apollo.queries.cabin.refetch();
      },
    },
    computed: mapGetters(['token', 'userInfo']),
  };
</script>

<style></style>
