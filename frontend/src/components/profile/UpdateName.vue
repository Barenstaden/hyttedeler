<template>
  <v-form @submit.prevent="addName">
    <v-text-field
      label="Ditt navn"
      v-model="newName"
      :messages="['Fyll inn navn for å fortsette']"
      :error-count="missingName ? 1 : 0"
      :error="missingName"
    ></v-text-field>
    <v-btn small rounded class="success mt-2" type="submit">Lagre</v-btn>
  </v-form>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    props: {
      name: String,
    },
    data() {
      return {
        missingName: false,
        newName: this.name,
      };
    },
    methods: {
      ...mapActions(['update']),
      async addName() {
        if (!this.newName) return (this.missingName = true);
        this.missingName = false;
        const response = await this.update({
          url: 'users',
          data: {
            name: this.newName,
          },
        });
        if (response) {
          console.log('uppdatert');
          this.$emit('updated');
        }
      },
    },
  };
</script>

<style></style>
