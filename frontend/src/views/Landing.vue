<template>
  <div class="wrapper" v-if="frontPageContent">
    <parallax class="section page-header">
      <div id="landingPageBackgroundVideo">
        <video autoplay muted loop>
          <source :src="frontPageContent.background.url" type="video/mp4" />
        </video>
      </div>
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">{{ frontPageContent.main_header }}</h1>
            <h4>
              {{ frontPageContent.secondary_header }}
            </h4>
            <br />

            <md-button
              v-if="!token"
              to="/login"
              class="md-success md-round md-lg"
              >{{ frontPageContent.main_button }}</md-button
            >

            <md-button
              v-if="token"
              to="/profil/kalender"
              class="md-success md-round md-lg"
              >Gå til oversikt</md-button
            >
          </div>
        </div>
      </div>
    </parallax>

    <div class="main main-raised" v-if="frontPageAbout">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">{{ frontPageAbout.header }}</h2>
              <h5 class="description">
                {{ frontPageAbout.secondary_header }}
              </h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div
                class="md-layout-item md-medium-size-33 md-small-size-100"
                v-for="sellingPoint in frontPageAbout.selling_points"
                :key="sellingPoint.header"
              >
                <div class="info">
                  <div class="icon icon-info">
                    <md-icon>{{ sellingPoint.icon }}</md-icon>
                  </div>
                  <h4 class="info-title">{{ sellingPoint.header }}</h4>
                  <p>
                    {{ sellingPoint.paragraph }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  bodyClass: "landing-page",
  data() {
    return {
      name: null,
      email: null,
      message: null,
    };
  },
  created() {
    this.fetchFrontPageContent();
    this.fetchFrontPageAbout();
  },
  methods: {
    ...mapActions(["fetchFrontPageContent", "fetchFrontPageAbout"]),
  },
  computed: {
    ...mapGetters(["frontPageContent", "frontPageAbout", "token"]),
  },
};
</script>

<style lang="scss" scoped>
#landingPageBackgroundVideo video {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.page-header {
  height: 80vh;
}
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
