<template>
  <div class="wrapper" id="loginPageWrapper">
    <div id="loginPageBackgroundVideo" v-if="loginPageContent">
      <video autoplay muted loop  v-if="loginPageContent">
        <source :src="loginPageContent.background.url" type="video/mp4">
      </video>
    </div>
    <div class="section">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto" style="margin-top: 20vh"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Kom inn i varmen</h4>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button>
              <p slot="description" class="description">Logg inn med e-post</p>


              <form class="md-form-group text-center" slot="inputs" @submit.prevent="submitRegisterForm">

                <md-field class="md-form-group" slot="inputs">
                  <md-icon>email</md-icon>
                  <label>E-post</label>
                  <md-input v-model="email" type="email" required></md-input>
                </md-field>

                <md-field class="md-form-group" slot="inputs">
                  <md-icon>lock_outline</md-icon>
                  <label>Passord</label>
                  <md-input type="password" v-model="password" required></md-input>
                </md-field>

                <md-button slot="footer" class="md-simple md-success md-lg" type="submit" @click="signIn = true">
                  Logg inn
                </md-button>
                <p>eller</p>
                <md-button slot="footer" class="md-simple md-success md-lg" type="submit" @click="signIn = false">
                  Lag ny bruker
                </md-button>
              </form>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      name: null,
      email: '',
      password: '',
      signIn: false
    };
  },
  created(){
    if(this.token) this.$router.push('/profil/kalender')
      else this.fetchLoginPageContent()
  },
  methods: {
    ...mapActions(['fetchLoginPageContent','register', 'login']),
    submitRegisterForm(){
      const userInfo = {
        email: this.email,
        password: this.password
      }
      if(this.signIn) this.login(userInfo)
        else this.register(userInfo);
    }
  },
  computed: {
    ...mapGetters(['token', 'loginPageContent']),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  watch: {
    token(){
      this.$router.push('/profil/kalender')
    }
  }
};
</script>

<style lang="css">
  #loginPageBackgroundVideo video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
