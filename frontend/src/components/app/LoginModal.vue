<template>
  <v-dialog v-model="showModal" max-width="500px">
    <v-card class="mx-auto">
      <v-img
        height="300"
        aspect-ratio="1"
        class="white--text align-end"
        src="/img/cabins/mountain.jpg"
      >
      </v-img>
      <v-card-title>Logg inn eller registrer deg</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="checkEmail()">
          <v-text-field
            label="E-post"
            type="email"
            :messages="[
              'Du er ikke bruker hos oss enda. Velg et passord for å fullføre registrering.',
            ]"
            v-model="email"
            :error-count="newUser ? 1 : 0"
            required
          >
          </v-text-field>

          <v-text-field
            class="mt-3"
            label="Passord"
            v-if="emailChecked"
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            :hint="
              !newUser ? 'Skriv inn passord for å logge inn' : 'Lag et passord'
            "
            required
          >
          </v-text-field>

          <v-card-actions>
            <v-list-item>
              <v-row justify="center">
                <v-btn class="success" type="submit" rounded>
                  Fortsett
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>

          <v-row v-if="error">
            <v-col>
              <p class="red--text font-weight-bold">
                E-post eller brukernavn er feil.
              </p>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import gql from 'graphql-tag';
  import { mapActions, mapGetters } from 'vuex';
  import axios from 'axios';
  export default {
    data() {
      return {
        email: '',
        password: '',
        show: false,
        error: false,
        emailChecked: false,
        newUser: false,
      };
    },
    created() {
      if (process.env.VUE_APP_EMAIL) this.email = process.env.VUE_APP_EMAIL;
    },
    methods: {
      ...mapActions([
        'fetchUserInfo',
        'checkIfUserExists',
        'login',
        'register',
      ]),
      async checkEmail() {
        if (!this.newUser && this.password) return this.submitLogin();
        if (this.newUser && this.password) {
          const token = await this.register({
            email: this.email,
            password: this.password,
          });
          console.log(token);
          if (token) {
            this.$store.commit('setToken', token);
            this.$store.commit('toggleLoginModal', false);
            this.$store.commit('setNewUser', true);
            this.fetchUserInfo();
          }
          return;
        }
        const response = await this.checkIfUserExists(this.email);
        console.log(response);
        this.newUser = !response;
        this.emailChecked = true;
      },
      async submitLogin() {
        const token = await this.login({
          email: this.email,
          password: this.password,
        });
        if (token) {
          this.$store.commit('setToken', token);
          this.$store.commit('toggleLoginModal', false);
          this.$store.commit('setSuccessMessage', 'Velkommen tilbake!');
          this.fetchUserInfo();
        } else {
          this.$store.commit('setToken', '');
          this.error = true;
        }
      },
    },
    computed: {
      ...mapGetters(['loginModal']),
      showModal: {
        get() {
          return this.loginModal;
        },
        set() {
          return this.$store.commit('toggleLoginModal', false);
        },
      },
    },
  };
</script>

<style></style>
