<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3>Oversikt over besøk</h3>
        <p v-if="!selectedCabin.bookings.length">
          Her vises oversikten over brukere som har booket tid. Legg inn en dato
          for når du skal på hytta neste gang. Start ved å trykke på en dato.
        </p>
        <b-row align-h="center" class="m-bottom">
          <b-badge
            :style="{ 'background-color': userColor(user) }"
            pill
            v-for="user in users"
            :key="user"
          >
            {{ user }}
          </b-badge>
        </b-row>

        <v-date-picker
          class="m-bottom-lg"
          :attributes="attributes"
          v-model="range"
          is-range
          :rows="3"
          :model-config="modelConfig"
          :columns="$screens({ default: 1, md: 2, lg: 3 })"
        />
      </b-col>
    </b-row>
    <transition
      enter-active-class="animate__animated animate__fadeInUp animate__faster"
      leave-active-class="animate__animated animate__fadeOutDown animate__faster"
    >
      <b-row id="dateRangeConfirm" shadow v-if="range.start && range.end">
        <b-col md="6" offset-md="3">
          <h4><strong>Valgte datoer</strong></h4>
          <p>
            <strong>Fra {{ range.start }}</strong>
          </p>
          <p>
            <strong>Til {{ range.end }}</strong>
          </p>
          <b-row>
            <md-button class="md-success md-round" @click="submitSaveBooking"
              >Lagre datoer</md-button
            >
            <md-button class="md-primary md-round" @click="removeDates"
              >Avbryt</md-button
            >
          </b-row>
        </b-col>
      </b-row>
    </transition>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      colors: ["green", "orange", "blue", "purple"],
      users: [],
      range: {
        start: "",
        end: "",
      },
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DDTHH:mm:ssXXX",
        timeAdjust: "12:00:00",
      },
    };
  },
  created() {
    if (!this.selectedCabin) this.fetchCabinInfo();
    else this.setUsers();
  },
  methods: {
    ...mapActions(["fetchCabinInfo", "updateBookings"]),
    setUsers() {
      if (!this.selectedCabin.bookings) return;
      this.selectedCabin.bookings.filter((booking) => {
        if (booking.user.name && !this.users.includes(booking.user.name)) {
          this.users.push(booking.user.name);
        }
      });
    },
    userColor(name) {
      return this.colors[this.users.findIndex((user) => user == name)];
    },
    submitSaveBooking() {
      this.selectedCabin.bookings.push({
        start: this.range.start,
        end: this.range.end,
        user: this.userInfo.id,
      });
      this.updateBookings();
    },
    removeDates() {
      this.range.start = "";
      this.range.end = "";
    },
  },
  computed: {
    ...mapGetters(["selectedCabin", "cabins", "userInfo", "saved"]),
    attributes() {
      if (!this.selectedCabin) return null;
      return this.selectedCabin.bookings.map((booking) => {
        if (booking.user.id) {
          return {
            highlight: this.userColor(booking.user.name),
            popover: {
              label: booking.user.name,
            },
            dates: booking,
          };
        }
      });
    },
  },
  watch: {
    selectedCabin() {
      if (this.selectedCabin && this.selectedCabin.bookings) this.setUsers();
    },
    saved() {
      if (this.saved) {
        this.range.start = "";
        this.range.end = "";
      }
    },
  },
};
</script>

<style>
.user-dot {
  background-color: red;
  height: 20px;
  width: 20px;
}
#dateRangeConfirm {
  height: auto;
  padding: 20px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 99999;
  margin: auto;
}
</style>
