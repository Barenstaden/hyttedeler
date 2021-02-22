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
                    src="@/assets/img/faces/cabin.jpeg"
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
                  <b-alert variant="danger" show v-if="!userInfo.name">
                    <h5 v-if="!userInfo.name">
                      <strong>Legg til navn for å komme i gang.</strong>
                    </h5>
                    <span v-if="!selectedCabin">
                      Om du ikke er hytteier kan du legge inn koden du har fått
                      fra en hytteeier etter å ha trykket på "legg til
                      hytte"</span
                    >
                  </b-alert>

                  <md-button
                    v-if="userInfo.name"
                    class="md-primary mb-5"
                    @click="addCabin = !addCabin"
                    >Opprette en ny hytte</md-button
                  >
                  <md-button
                    v-if="userInfo.name"
                    class="md-primary mb-5"
                    @click="joinCabinForm = !joinCabinForm"
                    >Få tilgang til en hytte</md-button
                  >

                  <form @submit.prevent="submitCreateCabin" v-if="addCabin">
                    <md-field>
                      <label for="name">Navn på hytta</label>
                      <md-input type="text" v-model="cabinName"></md-input>
                    </md-field>

                    <md-field>
                      <label for="aboutCabin">Om hytta</label>
                      <md-textarea
                        md-autogrow
                        v-model="cabinDescription"
                      ></md-textarea>
                    </md-field>

                    <md-button type="submit" class="md-success md-round"
                      >Lagre hytte</md-button
                    >
                  </form>

                  <form v-if="joinCabinForm" @submit.prevent="submitJoinCabin">
                    <md-field :class="joinCabinError ? 'md-invalid' : ''">
                      <label for="">Hytte-id</label>
                      <md-input
                        v-model="joinCabinId"
                        type="number"
                        required
                      ></md-input>
                      <span class="md-error">{{ joinCabinError }}</span>
                    </md-field>
                    <md-button
                      class="md-primary md-round mt-4 mb-5"
                      type="submit"
                      >Koble til hytte</md-button
                    >
                  </form>

                  <b-alert show variant="success" v-if="cabinJoined">
                    Din forespørsel er sendt til godkjenning! Du vil få tilgang
                    på alle funksjoner når forespørselen er godkjent.
                  </b-alert>
                </div>
              </div>
            </div>
          </div>

          <b-row v-if="cabinsAwaitingApproval && cabinsAwaitingApproval.length">
            <b-col md="6" offset-md="3" class="mb-5">
              <h3 class="text-center">
                Hytter som venter godkjenning fra eier
              </h3>
              <b-list-group>
                <b-list-group-item
                  v-for="cabin in cabinsAwaitingApproval"
                  :key="cabin.id"
                >
                  Hytte-id: {{ cabin.id }} · {{ cabin.name }}
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>

          <b-row class="mt-5" v-if="selectedCabin && selectedCabin.name">
            <b-col md="" offset-md="">
              <md-tabs md-sync-route class="md-primary" md-alignment="centered">
                <md-tab
                  to="/profil/hytter"
                  :md-label="selectedCabin.name"
                  md-icon="expand_more"
                >
                </md-tab>

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

                <md-tab
                  v-if="userInfo.id == selectedCabin.owner.id"
                  to="/profil/tilgang"
                  md-label="Tilgang"
                  md-icon="lock"
                >
                </md-tab>
              </md-tabs>
            </b-col>

            <router-view />
          </b-row>

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
      addCabin: false,
      joinCabinForm: false,
      joinCabinId: null,
      selectCabin: "",
      cabinName: "",
      cabinDescription: "",
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
    setInterval(() => {
      this.fetchCabinInfo(this.selectedCabin.name);
    }, 30000);
  },
  methods: {
    ...mapActions([
      "fetchUserInfo",
      "fetchCabinInfo",
      "saveUserInfo",
      "createCabin",
      "joinCabin",
    ]),
    closeModal() {
      this.$store.commit("saved", false);
    },
    isActive(path) {
      return this.$route.path == path ? "md-primary" : "md-accent";
    },
    submitCreateCabin() {
      this.createCabin({ name: this.cabinName, desc: this.cabinDescription });
    },
    submitJoinCabin() {
      this.joinCabin(this.joinCabinId);
    },
  },
  computed: {
    ...mapGetters([
      "cabins",
      "cabinsAwaitingApproval",
      "selectedCabin",
      "userInfo",
      "saved",
      "joinCabinError",
      "cabinJoined",
    ]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  watch: {
    saved() {
      this.changeName = false;
      this.addCabin = false;
      this.joinCabinId = false;
    },
    selectedCabin() {
      // if (this.$route.path.includes("om-hytta")) return;
      // this.$router.push("/profil/om-hytta");
    },
    cabinJoined() {
      this.joinCabinForm = false;
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
