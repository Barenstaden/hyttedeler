<template>
  <v-container v-if="successMessage">
    <v-row>
      <v-alert class="mt-5 ml-3" dense type="success">{{
        successMessage
      }}</v-alert>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: mapGetters(['successMessage']),
    watch: {
      successMessage() {
        setTimeout(() => {
          this.$store.commit('setSuccessMessage', '');
        }, 5000);
      },
    },
  };
</script>

<style></style>
