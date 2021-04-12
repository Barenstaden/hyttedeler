<template>
  <v-container v-if="cabin">
    <v-row justify="center">
      <v-col md="6" class="m-bottom-lg">
        <v-card>
          <v-card-title>
            Faste rutiner
          </v-card-title>
          <v-list-item>
            <v-list-item-content>
              <v-form @submit.prevent="addRoutine">
                <v-text-field
                  outlined
                  clearable
                  label="Legg til en rutine"
                  type="text"
                  @click:append-outer="addRoutine"
                  append-outer-icon="mdi-plus"
                  v-model="routine"
                  hint="Trykk enter eller + for å legge til"
                >
                </v-text-field>
              </v-form>
            </v-list-item-content>
          </v-list-item>
          <draggable v-model="cabin.fixed_routines">
            <transition-group
              enter-active-class="animate__animated animate__flipInX"
              leave-to-class="animate__animated animate__flipOutX animate__faster"
            >
              <v-list-item
                v-for="(routine, i) in cabin.fixed_routines"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ i + 1 }}. {{ routine.name }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-btn
                  v-if="edit"
                  float
                  x-small
                  rounded
                  color="error"
                  @click="deleteRoutine(routine)"
                  >Slett</v-btn
                >
              </v-list-item>
            </transition-group>
          </draggable>
          <v-list-item>
            <span v-if="!cabin.fixed_routines || !cabin.fixed_routines.length">
              Du har ingen faste rutiner 👷🏼‍♀️
            </span>
            <span class="font-weight-bold" v-else>
              Dra oppgavene for å endre rekkefølge ⚙️
            </span>
          </v-list-item>
          <v-list-item class="mt-0">
            <v-btn x-small rounded color="primary" @click="edit = !edit">
              <span v-if="!edit">
                Rediger faste rutiner
              </span>
              <span v-else>Ferdig</span>
            </v-btn>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import draggable from 'vuedraggable';
  import gql from 'graphql-tag';
  import axios from 'axios';
  export default {
    components: {
      draggable,
    },
    data() {
      return {
        routine: '',
        alreadyInList: false,
        edit: false,
      };
    },
    apollo: {
      cabin: {
        query: gql`
          query cabin($id: ID!) {
            cabin(id: $id) {
              id
              fixed_routines {
                name
                id
              }
            }
          }
        `,
        variables() {
          return {
            id: this.$route.params.cabin,
          };
        },
      },
    },
    methods: {
      ...mapActions(['update']),
      addRoutine() {
        if (!this.routine) return;
        if (
          !this.cabin.fixed_routines.some(
            (routine) =>
              routine.name.toLowerCase() == this.routine.toLowerCase(),
          )
        ) {
          this.cabin.fixed_routines.push({ name: this.routine });
          this.alreadyInList = '';
          this.updateFixedRoutines();
          this.routine = '';
        } else {
          this.alreadyInList = true;
          this.routine = '';
        }
      },
      deleteRoutine(routineToRemove) {
        this.cabin.fixed_routines.splice(
          this.cabin.fixed_routines.findIndex(
            (routine) => routine.name == routineToRemove,
          ),
          1,
        );
        this.updateFixedRoutines();
      },
      async updateFixedRoutines() {
        const response = await this.update({
          url: 'cabins',
          fixed_routines: this.cabin.fixed_routines,
        });
        this.cabin.fixed_routines = response.fixed_routines;
      },
    },
    computed: {
      ...mapGetters(['token']),
    },
  };
</script>

<style></style>
