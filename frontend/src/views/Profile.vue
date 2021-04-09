<template>
  <v-container v-if="userInfo">
    <v-row justify="center">
      <div class="mx-auto">
        <v-img
          height="100"
          width="100"
          class="rounded-circle"
          :src="
            userInfo.image ? userInfo.image.url : '/img/cabins/mountain.jpg'
          "
        ></v-img>
      </div>
    </v-row>
    <v-row justify="center" class="mt-5">
      <h3>{{ userInfo.name }}</h3>
    </v-row>
    <router-view />
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    bodyClass: 'profile-page',
    data() {
      return {
        changeName: false,
        addCabin: false,
        joinCabinForm: false,
        joinCabinId: null,
        selectCabin: '',
        cabinName: '',
        cabinDescription: '',
      };
    },
    props: {
      header: {
        type: String,
        default: require('@/assets/img/mountain-cabin.jpg'),
      },
    },
    methods: {},
    computed: {
      ...mapGetters(['selectedCabin', 'userInfo']),
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
