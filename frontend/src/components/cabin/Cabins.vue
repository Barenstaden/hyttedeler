<template>
  <b-container>
    <b-row v-if="selectedCabin">
      <b-col md="4" offset-md="4" class="text-center mb-5">
        <h4>Dine hytter</h4>
        <md-button
          @click="setSelectedCabin(cabin)"
          class="md-round"
          :class="cabin.name == selectedCabin.name ? 'md-primary' : 'md-accent'"
          v-for="(cabin, index) in cabins"
          :key="cabin.name"
        >
          {{
            cabin.name ? cabin.name : "Venter på godkjenning  " + (index + 1)
          }}
        </md-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    setSelectedCabin(cabin) {
      this.$store.commit("setCabin", cabin);
    },
  },
  computed: {
    ...mapGetters(["cabins", "selectedCabin"]),
  },
};
</script>

<style></style>
