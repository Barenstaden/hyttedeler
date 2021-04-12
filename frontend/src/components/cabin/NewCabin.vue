<template>
  <v-card>
    <v-card-title>
      Opprett ny hytte
    </v-card-title>
    <v-list-item>
      <v-list-item-content>
        <form @submit.prevent="addCabin">
          <v-text-field
            outlined
            label="Tittel på hytta"
            v-model="name"
            type="text"
            hint='For eksempel "Hytta på fjellet"'
          />
          <v-select
            :items="locations"
            item-text="human"
            item-value="location"
            outlined
            v-model="location"
            label="Lokasjon"
          ></v-select>

          <v-btn
            rounded
            :loading="loading"
            class="success mb-10"
            @click="addCabin"
            >Lagre</v-btn
          >
        </form>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        name: '',
        location: '',
        locations: [
          { human: 'Sjøen', location: 'sea' },
          { human: 'Fjellet', location: 'mountain' },
          { human: 'Innsjø', location: 'lake' },
        ],
        loading: false,
      };
    },
    methods: {
      async addCabin() {
        this.loading = true;
        const response = await axios({
          method: 'post',
          url: '/cabins',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          data: {
            name: this.name,
            location: this.location,
            owner: this.userInfo.id,
            users: this.userInfo.id,
          },
        });
        this.loading = false;
        this.$emit('cabinAdded', response.data);
      },
    },
    computed: mapGetters(['token', 'userInfo']),
  };
</script>

<style></style>
