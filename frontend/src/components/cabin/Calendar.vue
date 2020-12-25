<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3>Oversikt over besøk</h3>
          <b-row align-h="center" class="m-bottom">
            <b-badge :style="{'background-color': userColor(user)}" pill v-for="user in users" :key="user">
              {{user}}
            </b-badge>
          </b-row>
        <v-calendar class="m-bottom-lg" :attributes='attributes' :rows="3" :columns="$screens({ default: 1, md: 2, lg: 3 })" />

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data(){
    return {
      colors: ['green', 'orange', 'blue', 'purple'],
      users: []
    }
  },
  created(){
    if(!this.selectedCabin) this.fetchCabinInfo()
      else this.setUsers()
  },
  methods: {
    ...mapActions(['fetchCabinInfo']),
    setUsers(){
      if(!this.selectedCabin.bookings) return
      this.selectedCabin.bookings.filter(booking => {
        if(!this.users.includes(booking.user.name)){
          this.users.push(booking.user.name)
        }
      })
    },
    userColor(name){
      return this.colors[this.users.findIndex(user => user == name)]
    }
  },
  computed: {
    ...mapGetters(['selectedCabin', 'cabins']),
    attributes(){
      if(!this.selectedCabin) return null
      return this.selectedCabin.bookings.map(booking => ({
        highlight: this.userColor(booking.user.name),
        popover: {
          label: booking.user.name
        },
        dates: booking
      }))
    }
  },
  watch: {
    selectedCabin(){
      if(this.selectedCabin && this.selectedCabin.bookings) this.setUsers()
    }
  }
}
</script>

<style>
.user-dot {
  background-color: red;
  height: 20px;
  width: 20px;
}
</style>