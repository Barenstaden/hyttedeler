<template>
  <b-container v-if="selectedCabin">
    <b-row>
      <b-col md="6" offset-md="3" class="m-bottom-lg">
        <h3>Faste rutiner</h3>

        <form class="m-bottom" @submit.prevent="submitAddRoutine">
          <md-field :class="alreadyInList">
            <label for="item">Legg til en rutine 👮🏼‍♀️</label>
            <md-input type="text" v-model="routine" required></md-input>
            <span class="md-error">Varen finnes allerede</span>
            <md-button type="submit" class="md-primary md-round md-sm"
              >Legg til</md-button
            >
          </md-field>
        </form>

        <b-list-group>
          <draggable
            v-model="selectedCabin.fixed_routines"
            @change="updateFixedRoutines"
          >
            <transition-group
              enter-active-class="animate__animated animate__flipInX"
              leave-to-class="animate__animated animate__flipOutX animate__faster"
            >
              <b-list-group-item
                style="cursor: grab"
                @mouseover="hover = item.name"
                v-for="item in selectedCabin.fixed_routines"
                :key="item.name"
              >
                {{ item.name }}
                <md-button
                  v-if="hover == item.name"
                  style="margin-top: -2px"
                  class="md-primary md-sm md-round float-right padding"
                  @click="deleteRoutine(item.name)"
                  >Slett</md-button
                >
              </b-list-group-item>
            </transition-group>
          </draggable>
        </b-list-group>

        <p v-if="!selectedCabin.fixed_routines.length">
          Du har ingen faste rutiner 👷🏼‍♀️
        </p>
        <p v-else>Dra oppgavene for å endre rekkefølge ⚙️</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      routine: "",
      alreadyInList: false,
      hover: "",
    };
  },
  methods: {
    ...mapActions(["updateFixedRoutines"]),
    submitAddRoutine() {
      if (
        !this.selectedCabin.fixed_routines.some(
          (routine) => routine.name.toLowerCase() == this.routine.toLowerCase()
        )
      ) {
        this.selectedCabin.fixed_routines.unshift({ name: this.routine });
        this.alreadyInList = "";
        this.updateFixedRoutines();
      } else {
        this.alreadyInList = "md-invalid";
        this.routine = "";
      }
    },
    deleteRoutine(routineToRemove) {
      this.selectedCabin.fixed_routines.splice(
        this.selectedCabin.fixed_routines.findIndex(
          (routine) => routine.name == routineToRemove
        ),
        1
      );
      this.updateFixedRoutines();
    },
  },
  computed: {
    ...mapGetters(["selectedCabin"]),
  },
  watch: {
    "selectedCabin.fixed_routines"() {
      if (
        this.selectedCabin.fixed_routines.some(
          (routine) => routine.name == this.routine
        )
      )
        this.routine = "";
    },
  },
};
</script>

<style></style>
