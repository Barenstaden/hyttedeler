<template>
  <v-card v-if="cabin" max-width="420" class="mx-auto mt-10" tile>
    <!-- Headers -->
    <v-card-title>
      🛒 Handleliste
    </v-card-title>
    <v-list-item>
      <v-list-item-content>
        <v-form class="mb-3" @submit.prevent="addItem">
          <v-text-field
            outlined
            clearable
            label="Legg til vare 🍫"
            type="text"
            @click:append-outer="addItem"
            append-outer-icon="mdi-plus"
            v-model="item"
            hint="Trykk enter eller + for å legge til"
          >
          </v-text-field>
          <p class="caption red--text mt-n2 ml-3" v-if="alreadyInList">
            Varen finnes allerede i handlelisten
          </p>
        </v-form>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <transition-group
      enter-active-class="animate__animated animate__flipInX"
      leave-to-class="animate__animated animate__flipOutX animate__faster"
    >
      <v-list-item
        v-for="item in shoppingList"
        :key="item.item"
        @mouseover="hover = item.item"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.item }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-checkbox
            @change="itemControl(item)"
            v-model="purchasedItems"
            :value="item"
          ></v-checkbox>
        </v-list-item-action>
        <v-btn
          v-if="edit"
          x-small
          rounded
          color="error"
          @click="deleteItem(item.item)"
          >Slett</v-btn
        >
      </v-list-item>
    </transition-group>

    <v-card-title>
      ✅ Fullført
    </v-card-title>

    <transition-group enter-active-class="animate__animated animate__flipInX">
      <v-list-item
        @mouseover="hover = item.item"
        v-for="item in purchasedItems"
        :key="item.item"
      >
        <v-list-item-content style="text-decoration: line-through;">
          {{ item.item }}
        </v-list-item-content>
        <v-list-item-action>
          <v-checkbox
            @change="itemControl(item)"
            v-model="purchasedItems"
            :value="item"
          ></v-checkbox>
        </v-list-item-action>
        <v-btn
          v-if="edit"
          style="text-decoration: none;"
          x-small
          rounded
          color="error"
          @click="deleteItem(item.item)"
          >Slett</v-btn
        >
      </v-list-item>
    </transition-group>
    <v-list-item class="mt-0">
      <v-btn x-small rounded color="primary" @click="edit = !edit">
        <span v-if="!edit">
          Rediger handleliste
        </span>
        <span v-else>Ferdig</span>
      </v-btn>
    </v-list-item>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import gql from 'graphql-tag';
  import axios from 'axios';
  export default {
    data() {
      return {
        purchased: '',
        edit: false,
        checked: true,
        item: '',
        alreadyInList: false,
        audio: new Audio(require('@/assets/audio/complete.mp3')),
      };
    },
    apollo: {
      cabin: {
        query: gql`
          query cabin($id: ID!) {
            cabin(id: $id) {
              id
              shopping_list {
                item
                added_by {
                  name
                  id
                }
                purchased
                purchased_by {
                  id
                  name
                }
                purchase_date
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
      ...mapActions(['updateCabin']),
      addItem() {
        if (!this.item) return;
        if (
          !this.cabin.shopping_list.some(
            (item) => item.item.toLowerCase() == this.item.toLowerCase(),
          )
        ) {
          this.cabin.shopping_list.unshift({
            item: this.item,
            added_by: this.userInfo.id,
          });
          this.alreadyInList = false;
          this.updateShoppingList();

          this.item = null;
        } else {
          this.alreadyInList = true;
        }
      },
      deleteItem(itemToRemove) {
        this.cabin.shopping_list = this.cabin.shopping_list.filter(
          (item) => item.item != itemToRemove,
        );
        this.updateShoppingList();
      },
      itemControl(itemToEdit) {
        itemToEdit.purchased = !itemToEdit.purchased;
        if (itemToEdit.purchased) this.audio.play();
        const index = this.cabin.shopping_list.findIndex(
          (item) => item.item == itemToEdit.item,
        );
        this.cabin.shopping_list.splice(index, 1);
        this.cabin.shopping_list.unshift(itemToEdit);
        this.updateShoppingList();
      },
      async updateShoppingList() {
        const response = await this.updateCabin({
          shopping_list: this.cabin.shopping_list,
        });
        if (response) this.cabin.shopping_list = response.shopping_list;
      },
    },
    computed: {
      ...mapGetters(['selectedCabin', 'userInfo', 'token']),
      shoppingList() {
        return this.cabin.shopping_list.filter((item) => !item.purchased);
      },
      purchasedItems: {
        get() {
          return this.cabin.shopping_list.filter((item) => item.purchased);
        },
        set() {},
      },
    },
    watch: {
      item() {
        this.alreadyInList = false;
      },
    },
  };
</script>

<style></style>
