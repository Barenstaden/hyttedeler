<template>
  <div id="material-kit">
    <div :class="{ 'nav-open': NavbarStore.showNavbar }">
      <Navigation/>
      <div>
        <router-view />
      </div>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Navigation from "@/layout/MainNavbar.vue"
import Footer from "@/layout/MainFooter.vue"

export default {
  components: {
    Navigation,
    Footer
  }
}
</script>

<style>

</style>