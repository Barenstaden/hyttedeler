<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile" v-if="userInfo">
                <div class="avatar">
                  <img
                    v-if="userInfo.image"
                    :src="userInfo.image.url"
                    alt="Bilde av deg"
                    class="img-raised rounded-circle profile-image img-fluid"
                  />
                  <img
                    v-else
                    src="@/assets/img/faces/card-profile1-square.jpg"
                    alt="Standardbilde"
                    class="img-raised rounded-circle profile-image img-fluid"
                  />
                </div>
                <div class="name">
                  <h3 class="title">
                    {{ userInfo.name ? userInfo.name : "Ola Nordmann" }}
                    <span @click="changeName = true">✏️</span>
                  </h3>

                  <form @submit.prevent="saveUserInfo">
                    <md-field v-if="changeName">
                      <label>Endre navn</label>
                      <md-input type="text" v-model="userInfo.name"></md-input>
                      <md-button class="md-primary md-round md-sm" type="submit"
                        >lagre</md-button
                      >
                    </md-field>
                  </form>

                  <h6>Hytteeier</h6>
                </div>
              </div>
            </div>
          </div>

          <b-row v-if="selectedCabin">
            <b-col md="4" offset-md="4" class="text-center">
              <md-button
                @click="setSelectedCabin(cabin)"
                class="md-round"
                :class="
                  cabin.name == selectedCabin.name ? 'md-primary' : 'md-accent'
                "
                v-for="(cabin, index) in cabins"
                :key="cabin.name"
              >
                {{ cabin.name ? cabin.name : "Hytte  " + (index + 1) }}
              </md-button>
            </b-col>
          </b-row>

          <b-container v-if="selectedCabin">
            <b-row>
              <b-col md="6" offset-md="3" class="text-center">
                <md-button
                  to="/profil/om-hytta"
                  class="md-round m-right-sm m-left-sm"
                  :class="isActive('/profil/om-hytta')"
                  >Om hytta</md-button
                >
                <md-button
                  to="/profil/kalender"
                  class="md-round m-right-sm"
                  :class="isActive('/profil/kalender')"
                  >Kalender</md-button
                >
                <md-button
                  to="/profil/handleliste"
                  class="md-round"
                  :class="isActive('/profil/handleliste')"
                  >Handleliste</md-button
                >
              </b-col>
            </b-row>
          </b-container>

          <div class="row">
            <b-col md="6" offset-md="3">
              <md-tabs md-sync-route class="md-primary" md-alignment="centered">
                <md-tab
                  to="/profil/om-hytta"
                  md-label="Om hytta"
                  md-icon="home"
                >
                </md-tab>

                <md-tab
                  to="/profil/kalender"
                  md-label="Kalender"
                  md-icon="calendar_today"
                >
                </md-tab>

                <md-tab
                  to="/profil/handleliste"
                  md-label="Handleliste"
                  md-icon="shopping_cart"
                >
                </md-tab>

                <md-tab
                  to="/profil/faste-rutiner"
                  md-label="Faste rutiner"
                  md-icon="list"
                >
                </md-tab>
              </md-tabs>
            </b-col>

            <router-view />
          </div>

          <modal v-if="saved">
            <template slot="header">
              <h4 class="modal-title">Alt gikk etter planen</h4>
              <md-button
                class="md-simple md-just-icon md-round modal-default-button"
                @click="closeModal"
              >
                <md-icon>clear</md-icon>
              </md-button>
            </template>

            <template slot="body">
              <p>Lagret!. Denne meldingen blir fjernet automatisk.</p>
            </template>

            <template slot="footer">
              <md-button class="md-danger md-simple" @click="closeModal"
                >Close</md-button
              >
            </template>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";
import { Modal } from "@/components";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Modal,
  },
  bodyClass: "profile-page",
  data() {
    return {
      changeName: false,
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/mountain-cabin.jpg"),
    },
  },
  created() {
    this.fetchUserInfo();
    this.fetchCabinInfo();
  },
  methods: {
    ...mapActions(["fetchUserInfo", "fetchCabinInfo", "saveUserInfo"]),
    setSelectedCabin(cabin) {
      this.$store.commit("setCabin", cabin);
    },
    closeModal() {
      this.$store.commit("saved", false);
    },
    isActive(path) {
      return this.$route.path == path ? "md-primary" : "md-accent";
    },
  },
  computed: {
    ...mapGetters(["cabins", "selectedCabin", "userInfo", "saved"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  watch: {
    selectedCabin() {
      console.log(this.selectedCabin);
    },
    saved() {
      this.changeName = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.profile-page.profile.profile-image {
  height: 200px !important;
  width: 200px !important;
}

.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
