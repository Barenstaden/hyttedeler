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
      <v-card-title>Logg inn</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login()">
          <v-text-field label="E-post" type="email" v-model="email" required>
          </v-text-field>
          <v-text-field
            label="Passord"
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            required
          >
          </v-text-field>

          <v-row v-if="error">
            <v-col>
              <p class="red--text font-weight-bold">
                E-post eller brukernavn er feil.
              </p>
            </v-col>
          </v-row>

          <v-row class="text-center">
            <v-col> Har du ikke bruker enda?</v-col>
          </v-row>
          <v-row class="text-center mt-0">
            <v-col>
              <v-btn text rounded class="m-0 p-0 error">Registrer deg</v-btn>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-list-item>
              <v-row justify="end">
                <v-btn class="success" type="submit" rounded>
                  Logg inn
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import gql from 'graphql-tag';
  import { mapActions, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        email: '',
        password: '',
        show: false,
        error: false,
      };
    },
    created() {
      if (process.env.VUE_APP_EMAIL) this.email = process.env.VUE_APP_EMAIL;
      if (process.env.VUE_APP_PASSWORD)
        this.password = process.env.VUE_APP_PASSWORD;
    },
    methods: {
      ...mapActions(['fetchUserInfo']),
      async login() {
        try {
          const response = await this.$apollo.mutate({
            mutation: gql`
              mutation login($identifier: String!, $password: String!) {
                login(input: { identifier: $identifier, password: $password }) {
                  jwt
                }
              }
            `,
            variables: {
              identifier: this.email,
              password: this.password,
            },
          });
          this.$store.commit('setToken', response.data.login.jwt);
          this.$store.commit('toggleLoginModal', false);
          this.$store.commit('setSuccessMessage', 'Velkommen tilbake!');
          this.fetchUserInfo();
        } catch (error) {
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
