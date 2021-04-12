<template>
  <v-stepper v-model="step" vertical>
    <v-stepper-step @click="step = 1" :complete="step > 1" step="1">
      Ditt navn 👤
      <small>Fyll inn navn så de andre brukerne av hytta vet hvem du er</small>
    </v-stepper-step>
    <v-stepper-content step="1"
      ><UpdateName :name="userInfo.name" @updated="step = 2"
    /></v-stepper-content>

    <v-stepper-step @click="step = 2" :complete="step > 2" step="2">
      Legg til en hytte 🏡
      <small>Legg til din første hytte</small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <div v-if="userInfo.cabins.length">
        <p class="purple--text">
          🚀 Du er allerede medlem av én eller flere hytter og kan hoppe over
          dette steget.
        </p>
        <v-btn small rounded class="warning" @click="step = 3">Hopp over</v-btn>
      </div>
      <NewCabin class="mt-3" @cabinAdded="step = 3" />
    </v-stepper-content>

    <v-stepper-step :complete="step > 2" step="3">
      Ferdig 🚀
      <small>Kom i gang med hyttedeler!</small>
    </v-stepper-step>
    <v-stepper-content step="3">
      <v-card v-if="userInfo.name && userInfo.cabins.length">
        <v-card-title>
          <h3>
            Du kan nå begynne å bruke Hyttedeler
          </h3>
        </v-card-title>
        <v-card-text>
          <v-btn rounded class="success" @click="finish"
            >Gå til dine hytter</v-btn
          >
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-title>
          <h3>Fullfør stegene over for å gå videre</h3>
        </v-card-title>
      </v-card>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    components: {
      UpdateName: () => import('@/components/profile/UpdateName.vue'),
      NewCabin: () => import('@/components/cabin/NewCabin.vue'),
    },
    data() {
      return {
        step: 1,
        name: '',
      };
    },
    methods: {
      ...mapActions(['fetchUserInfo']),
      addName() {
        console.log(this.name);
      },
      finish() {
        this.$store.commit('setNewUser', false);
        this.$router.push('/cabins');
      },
    },
    computed: mapGetters(['userInfo']),
    watch: {
      step() {
        this.fetchUserInfo();
      },
    },
  };
</script>

<style></style>
