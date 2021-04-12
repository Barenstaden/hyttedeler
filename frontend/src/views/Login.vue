<template>
  <div></div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    bodyClass: 'login-page',
    data() {
      return {
        name: null,
        email: '',
        password: '',
        signIn: false,
      };
    },
    created() {
      if (process.env.VUE_APP_EMAIL) this.email = process.env.VUE_APP_EMAIL;
      if (process.env.VUE_APP_PASSWORD)
        this.password = process.env.VUE_APP_PASSWORD;
      if (this.token) this.$router.push('/profil/kalender');
      else this.fetchLoginPageContent();
    },
    methods: {
      ...mapActions(['fetchLoginPageContent', 'register', 'login']),
      submitRegisterForm() {
        const userInfo = {
          email: this.email,
          password: this.password,
        };
        if (this.signIn) this.login(userInfo);
        else this.register(userInfo);
      },
    },
    computed: {
      ...mapGetters(['token', 'loginPageContent', 'loginError']),
      headerStyle() {
        return {
          backgroundImage: `url(${this.header})`,
        };
      },
    },
    watch: {
      token() {
        this.$router.push('/profil/kalender');
      },
    },
  };
</script>
