<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h1>Velkommen til Hyttedeler!</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="6">
        <NewUserForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    components: {
      NewUserForm: () => import('@/components/NewUserForm.vue'),
    },
  };
</script>

<style></style>
