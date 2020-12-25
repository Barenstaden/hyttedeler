import { apolloClient } from "@/apollo";
import queries from "@/queries/user.js";
import store from "..";
import axios from "axios";

const state = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  loginError: "",
  userInfo: null,
  cabins: [],
  selectedCabin: null,
  saved: false,
};

const getters = {
  token: (state) => state.token,
  loginError: (state) => state.loginError,
  userInfo: (state) => state.userInfo,
  cabins: (state) => state.cabins,
  selectedCabin: (state) => state.selectedCabin,
  saved: (state) => state.saved,
};

const actions = {
  async register({ commit, dispatch }, userData) {
    axios
      .post("/auth/local/register", {
        email: userData.email,
        username: userData.email,
        password: userData.password,
      })
      .then((res) => {
        commit("setToken", res.data.jwt);
      })
      .catch((err) => {
        commit("loginError", err.response.data.message[0].messages[0].message);
      });
  },
  login({ commit }, userData) {
    axios
      .post("/auth/local", {
        identifier: userData.email,
        password: userData.password,
      })
      .then((res) => {
        commit("setToken", res.data.jwt);
      })
      .catch((err) => {
        commit("loginError", err.response.data.message[0].messages[0].message);
      });
  },
  async fetchCabinInfo({ commit }) {
    const { data } = await apolloClient.query({
      query: queries.cabinQuery,
    });
    commit("setCabins", data.self.cabins);
    commit("setCabin", data.self.cabins[0]);
  },
  async fetchUserInfo({ commit }) {
    const { data } = await apolloClient.query({
      query: queries.userQuery,
    });
    commit("setUserInfo", data.self);
  },
  async saveUserInfo({ commit }) {
    console.log(state.userInfo);
    const { data } = await apolloClient.mutate({
      mutation: queries.updateUserInfoQuery,
      variables: {
        id: state.userInfo.id,
        name: state.userInfo.name,
      },
    });
    if (data.updateUser) commit("saved", true);
  },
  async updateCabinAbout({ commit }) {
    const { data } = await apolloClient.mutate({
      mutation: queries.updateCabinAboutQuery,
      variables: {
        id: state.selectedCabin.id,
        name: state.selectedCabin.name,
        about: state.selectedCabin.about,
      },
    });
    if (data.updateCabin) commit("saved", true);
  },
  async updateShoppingList({ commit }) {
    cleanQueryData("selectedCabin", "shopping_list");
    const { data } = await apolloClient.mutate({
      mutation: queries.updateShoppingListQuery,
      variables: {
        id: state.selectedCabin.id,
        shopping_list: state.selectedCabin.shopping_list,
      },
    });
    console.log(data);
  },
  async updateFixedRoutines({ commit }) {
    cleanQueryData("selectedCabin", "fixed_routines");
    const { data } = await apolloClient.mutate({
      mutation: queries.updateFixedRoutinesQuery,
      variables: {
        id: state.selectedCabin.id,
        routines: state.selectedCabin.fixed_routines,
      },
    });
    console.log(data);
  },
};

// To update component
const cleanQueryData = (prop, array) => {
  // Remove __typename and change from object to id for userinfo
  state[prop][array].forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (item[key] && item[key].__typename) {
        delete item[key].__typename;
      }
      // Remove userdata
      if (item[key] && item[key].name && item[key].id) {
        item[key] = item[key].id;
      }
    });
    delete item.__typename;
  });
};

const mutations = {
  setToken: (state, token) => {
    localStorage.setItem("token", token);
    state.token = token;
  },
  loginError: (state, error) => (state.loginError = error),
  setUserInfo: (state, userInfo) => (state.userInfo = userInfo),
  setCabins: (state, cabins) => (state.cabins = cabins),
  setCabin: (state, cabin) => (state.selectedCabin = cabin),
  signOut: (state) => {
    Object.keys(state).forEach((key) => {
      if (state[key]) {
        state[key] = null;
      }
    });
    localStorage.removeItem("token");
  },
  saved: (state, saved) => {
    state.saved = saved;
    setTimeout(() => {
      state.saved = false;
    }, 2000);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
