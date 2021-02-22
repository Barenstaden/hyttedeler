<template>
  <b-container>
    <b-row>
      <b-col md="6" offset-md="3" class="mb-5">
        <b-alert show variant="success" class="mt-5">
          <h4>
            <strong>Din unike hytte-id er {{ selectedCabin.id }}</strong>
          </h4>
          <p>
            Denne koden brukes ved å trykke på "Få tilgang til en hytte", og
            fylle inn koden. De vil ikke kunne se andre detaljer enn navnet på
            hytta frem til du godkjenner dem på denne siden.
          </p>
        </b-alert>
        <h3 v-if="selectedCabin.not_approved_users.length" class="text-center">
          Brukere som venter på tilgang
        </h3>
        <b-list-group>
          <b-list-group-item
            v-for="user in selectedCabin.not_approved_users"
            :key="user.id"
          >
            <span class="pt-3">{{ user.name }}</span>
            <md-button
              class="md-primary mt-0 mb-0 float-right md-sm md-round"
              @click="submitDeleteUser(user)"
              >Slett</md-button
            >
            <md-button
              class="md-success mt-0 mb-0 float-right md-sm md-round"
              @click="submitApproveAccess(user)"
              >Gi tilgang</md-button
            >
          </b-list-group-item>
        </b-list-group>
        <h3 v-if="selectedCabin.users.length" class="text-center">
          Brukere med tilgang
        </h3>
        <b-list-group>
          <b-list-group-item v-for="user in selectedCabin.users" :key="user.id">
            <span class="pt-3">{{ user.name }}</span>
            <md-button
              v-if="userInfo.id != selectedCabin.owner.id"
              class="md-primary mt-0 mb-0 float-right md-sm md-round"
              @click="submitRemoveAccess(user)"
              >Fjern tilgang</md-button
            >
            <span v-if="userInfo.id == user.id"> (Deg)</span>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["approveUser"]),
    submitApproveAccess(user) {
      this.selectedCabin.users.push(user);
      this.selectedCabin.not_approved_users.splice(
        this.selectedCabin.not_approved_users.findIndex(
          (cabinUser) => cabinUser.id == user.id
        ),
        1
      );
      this.approveUser();
    },
    submitRemoveAccess(user) {
      this.selectedCabin.not_approved_users.push(user);
      this.selectedCabin.users.splice(
        this.selectedCabin.users.findIndex(
          (cabinUser) => cabinUser.id == user.id
        ),
        1
      );
      this.approveUser();
    },
    submitDeleteUser(user) {
      this.selectedCabin.not_approved_users.splice(
        this.selectedCabin.not_approved_users.findIndex(
          (cabinUser) => cabinUser.id == user.id
        ),
        1
      );
      this.approveUser();
    },
  },
  computed: {
    ...mapGetters(["selectedCabin", "userInfo"]),
  },
};
</script>

<style></style>
