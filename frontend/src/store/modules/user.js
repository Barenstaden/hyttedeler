import { apolloClient } from "@/apollo";
import queries from "@/queries/user.js";
import store from "..";
import axios from "axios";
import { VariablesInAllowedPositionRule } from "graphql";

const state = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  loginError: "",
  userInfo: null,
  cabins: [],
  cabinsAwaitingApproval: [],
  selectedCabin: null,
  saved: false,
  joinCabinError: "",
  cabinJoined: false,
};

const getters = {
  token: (state) => state.token,
  loginError: (state) => state.loginError,
  userInfo: (state) => state.userInfo,
  cabins: (state) => state.cabins,
  cabinsAwaitingApproval: (state) => state.cabinsAwaitingApproval,
  selectedCabin: (state) => state.selectedCabin,
  saved: (state) => state.saved,
  joinCabinError: (state) => state.joinCabinError,
  cabinJoined: (state) => state.cabinJoined,
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
  async createCabin({ commit, dispatch }, cabinInfo) {
    const { data } = await apolloClient.mutate({
      mutation: queries.createCabinQuery,
      variables: {
        name: cabinInfo.name,
        about: cabinInfo.desc,
        owner: state.userInfo.id,
        users: [state.userInfo.id],
      },
    });
    if (data.createCabin.cabin) {
      dispatch("fetchCabinInfo", cabinInfo.name);
    }
  },
  async joinCabin({ commit }, id) {
    const cabin = await getCabinById(id);
    if (cabin.data.cabin) {
      var isMember = cabin.data.cabin.not_approved_users.some(
        (user) => user.id == state.userInfo.id
      );
      if (!isMember) {
        isMember = cabin.data.cabin.users.some(
          (user) => user.id == state.userInfo.id
        );
      }

      if (isMember) {
        commit("joinCabinError", "Du er allerede medlem av denne hytta");
        return;
      } else {
        var cabinUsers = arrayOfUserIds(cabin.data.cabin.not_approved_users);
        cabinUsers.push(state.userInfo.id);
      }

      const { data } = await apolloClient.mutate({
        mutation: queries.joinCabinQuery,
        variables: {
          id: cabin.data.cabin.id,
          not_approved_users: cabinUsers,
        },
      });
      if (data.updateCabin.cabin) commit("setCabinJoined");
    } else {
      commit(
        "joinCabinError",
        "Ingen hytte funnet. Sjekk at du har fått riktig hytte-id"
      );
    }
  },
  async approveUser({ commit }) {
    const data = await apolloClient.mutate({
      mutation: queries.updateApprovedUsersQuery,
      variables: {
        id: state.selectedCabin.id,
        users: arrayOfUserIds(state.selectedCabin.users),
        not_approved_users: arrayOfUserIds(
          state.selectedCabin.not_approved_users
        ),
      },
    });
  },
  async fetchCabinInfo({ commit }, selectedCabin) {
    const { data } = await apolloClient.query({
      query: queries.cabinQuery,
      fetchPolicy: "network-only",
    });
    if (data.self.cabins) {
      commit("setCabins", data.self.cabins);
      if (selectedCabin) {
        const newCabin = data.self.cabins.find(
          (findCabin) => (findCabin.name = selectedCabin)
        );
        commit("setCabin", newCabin);
      } else if (state.selectedCabin) {
        const newCabin = data.self.cabins.find(
          (findCabin) => (findCabin.name = state.selectedCabin.name)
        );
        commit("setCabin", newCabin);
      } else {
        commit("setCabin", data.self.cabins[0]);
      }
    }
    if (data.self.cabins_awaiting_approval) {
      commit("setCabinsAwaitingApproval", data.self.cabins_awaiting_approval);
    }
  },
  async fetchUserInfo({ commit }) {
    const { data } = await apolloClient.query({
      query: queries.userQuery,
      fetchPolicy: "network-only",
    });
    commit("setUserInfo", data.self);
  },
  async saveUserInfo({ commit }) {
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
  },
  async updateBookings({ commit, dispatch }) {
    cleanQueryData("selectedCabin", "bookings");
    const { data } = await apolloClient.mutate({
      mutation: queries.updateBookingsQuery,
      variables: {
        id: state.selectedCabin.id,
        bookings: state.selectedCabin.bookings,
      },
    });
    if (data.updateCabin) {
      dispatch("fetchCabinInfo", state.selectedCabin.id);
      commit("saved", true);
    }
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

const getCabinById = async (id) => {
  return await apolloClient.query({
    query: queries.cabinByIdQuery,
    variables: {
      id: id,
    },
  });
};

const arrayOfUserIds = (array) => {
  var users = [];
  array.forEach((user) => {
    users.push(user.id);
  });
  return users;
};

const mutations = {
  setToken: (state, token) => {
    localStorage.setItem("token", token);
    state.token = token;
  },
  loginError: (state, error) => (state.loginError = error),
  setUserInfo: (state, userInfo) => (state.userInfo = userInfo),
  setCabins: (state, cabins) => (state.cabins = cabins),
  setCabinsAwaitingApproval: (state, cabins) =>
    (state.cabinsAwaitingApproval = cabins),
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
  joinCabinError: (state, error) => (state.joinCabinError = error),
  setCabinJoined: (state) => (state.cabinJoined = true),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
