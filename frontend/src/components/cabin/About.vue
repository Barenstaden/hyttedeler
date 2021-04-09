<template>
  <b-container class="m-bottom" v-if="selectedCabin">
    <b-row>
      <b-col md="6" offset-md="3" class="text-center">
        <h3 v-if="selectedCabin.name">
          {{ selectedCabin.name }} <span v-if="edit">✏️</span>
        </h3>

        <p v-if="selectedCabin.about">
          {{ selectedCabin.about }} <span v-if="edit">✏️</span>
        </p>

        <form v-if="openEditForm" @submit.prevent="submitUpdateCabinAbout">
          <md-field>
            <label for="name">Navn på hytta</label>
            <md-input
              name="name"
              type="text"
              v-model="selectedCabin.name"
            ></md-input>
          </md-field>

          <md-field>
            <label for="about">Beskrivelse av hytta</label>
            <md-textarea
              name="about"
              v-model="selectedCabin.about"
              md-autogrow
            ></md-textarea>
          </md-field>

          <md-button type="submit" class="md-round md-success">Lagre</md-button>
        </form>

        <h3 v-if="userInfo.id == selectedCabin.owner.id">Brukere av hytta</h3>
        <b-alert
          show
          variant="success"
          v-if="selectedCabin.cabin_users && !selectedCabin.cabin_users.length"
        >
          Det finnes ingen brukere for hytta enda. Del din unike hytte-id med de
          du ønsker: {{ selectedCabin.id }}. Inviterte brukere må godkjennes av
          deg før de får booke tid i hyttekalenderen.
        </b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      edit: false,
      openEditForm: false
    };
  },
  created() {
    if (
      this.selectedCabin &&
      !this.selectedCabin.name &&
      !this.selectedCabin.about
    )
      this.openEditForm = true;
  },
  methods: {
    ...mapActions(["updateCabinAbout"]),
    submitUpdateCabinAbout() {
      this.updateCabinAbout();
    }
  },
  computed: {
    ...mapGetters(["selectedCabin", "userInfo"])
  },
  watch: {
    selectedCabin() {
      if (!this.selectedCabin.name && !this.selectedCabin.about)
        this.openEditForm = true;
    }
  }
};
</script>

<style></style>
