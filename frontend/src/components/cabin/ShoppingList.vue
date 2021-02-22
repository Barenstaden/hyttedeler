<template>
  <b-container v-if="selectedCabin" class="m-bottom-lg">
    <b-row>
      <b-col md="6" offset-md="3" v-if="!selectedCabin.shopping_list">
        <p>Begynn å legge til ting i handlelisten 📝</p>
      </b-col>
      <b-col md="6" offset-md="3" v-if="selectedCabin.shopping_list">
        <h3>🛒 Handleliste</h3>

        <form class="m-bottom" @submit.prevent="submitAddItemToShoppingList">
          <md-field :class="alreadyInList">
            <label for="item">Legg til vare 🍫</label>
            <md-input type="text" v-model="item" required></md-input>
            <span class="md-error">Varen finnes allerede</span>
            <md-button type="submit" class="md-primary md-round md-sm"
              >Legg til</md-button
            >
          </md-field>
        </form>

        <p v-if="!selectedCabin.shopping_list.length">
          Hytta skal være fylt opp med det som trengs 🍫
        </p>
        <b-list-group>
          <transition-group
            enter-active-class="animate__animated animate__flipInX"
            leave-to-class="animate__animated animate__flipOutX animate__faster"
          >
            <b-list-group-item
              v-for="item in shoppingList"
              :key="item.item"
              @mouseover="hover = item.item"
              >{{ item.item }}
              <md-checkbox
                class="float-right"
                @change="itemControl(item)"
                v-model="purchasedItems"
                :value="item"
              ></md-checkbox>
              <md-button
                v-if="hover == item.item"
                style="margin-top: -2px; margin-right: 20px"
                class="md-primary md-sm md-round float-right padding"
                @click="deleteItem(item.item)"
                >Slett</md-button
              ></b-list-group-item
            >
          </transition-group>
        </b-list-group>

        <h3>✅ Fullført</h3>
        <b-list-group>
          <transition-group
            enter-active-class="animate__animated animate__flipInX"
          >
            <b-list-group-item
              @mouseover="hover = item.item"
              v-for="item in purchasedItems"
              :key="item.item"
              style="text-decoration: line-through;"
              >{{ item.item }}
              <md-checkbox
                class="float-right"
                @change="itemControl(item)"
                v-model="purchasedItems"
                :value="item"
              ></md-checkbox>
              <md-button
                v-if="hover == item.item"
                style="margin-top: -2px; margin-right: 20px"
                class="md-primary md-sm md-round float-right padding"
                @click="deleteItem(item.item)"
                >Slett</md-button
              >
            </b-list-group-item>
          </transition-group>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      purchased: "",
      hover: "test",
      checked: true,
      item: "",
      alreadyInList: false,
      audio: new Audio(require("@/assets/audio/complete.mp3")),
    };
  },
  created() {
    this.fetchCabinInfo();
  },
  methods: {
    ...mapActions(["fetchCabinInfo", "updateShoppingList"]),
    submitAddItemToShoppingList() {
      if (
        !this.selectedCabin.shopping_list.some(
          (item) => item.item.toLowerCase() == this.item.toLowerCase()
        )
      ) {
        this.selectedCabin.shopping_list.unshift({
          item: this.item,
          added_by: this.userInfo.id,
        });
        this.alreadyInList = "";
        this.updateShoppingList();
      } else {
        this.alreadyInList = "md-invalid";
      }
    },
    deleteItem(itemToRemove) {
      this.selectedCabin.shopping_list.splice(
        this.selectedCabin.shopping_list.findIndex(
          (item) => item.item == itemToRemove
        ),
        1
      );
      this.updateShoppingList();
    },
    itemControl(itemToEdit) {
      itemToEdit.purchased = !itemToEdit.purchased;
      if (itemToEdit.purchased) this.audio.play();
      const index = this.selectedCabin.shopping_list.findIndex(
        (item) => item.item == itemToEdit.item
      );
      this.selectedCabin.shopping_list.splice(index, 1);
      this.selectedCabin.shopping_list.unshift(itemToEdit);
      this.updateShoppingList();
    },
  },
  computed: {
    ...mapGetters(["selectedCabin", "userInfo"]),
    shoppingList() {
      return this.selectedCabin.shopping_list.filter((item) => !item.purchased);
    },
    purchasedItems: {
      get() {
        return this.selectedCabin.shopping_list.filter(
          (item) => item.purchased
        );
      },
      set() {},
    },
  },
  watch: {
    "selectedCabin.shopping_list"() {
      if (
        this.selectedCabin.shopping_list.some((item) => item.item == this.item)
      )
        this.item = "";
    },
  },
};
</script>

<style></style>
