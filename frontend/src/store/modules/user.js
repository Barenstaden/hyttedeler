import { apolloClient } from '@/apollo';
import queries from '@/queries/user.js';
import axios from 'axios';

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  userInfo: null,
  selectedCabin: null,
  successMessage: '',
  error: false,
  loginModal: false,
  registerModal: false,
  sideMenu: true,
};

const getters = {
  token: (state) => state.token,
  userInfo: (state) => state.userInfo,
  selectedCabin: (state) => state.selectedCabin,
  successMessage: (state) => state.successMessage,
  error: (state) => state.error,
  loginModal: (state) => state.loginModal,
  sideMenu: (state) => state.sideMenu,
};

const actions = {
  async register({ commit, dispatch }, userData) {
    axios
      .post('/auth/local/register', {
        email: userData.email,
        username: userData.email,
        password: userData.password,
      })
      .then((res) => {
        commit('setToken', res.data.jwt);
      })
      .catch((err) => {
        commit('loginError', err.response.data.message[0].messages[0].message);
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
      dispatch('fetchCabinInfo', cabinInfo.name);
    }
  },
  async joinCabin({ commit }, id) {
    const cabin = await getCabinById(id);
    if (cabin.data.cabin) {
      var isMember = cabin.data.cabin.not_approved_users.some(
        (user) => user.id == state.userInfo.id,
      );
      if (!isMember) {
        isMember = cabin.data.cabin.users.some(
          (user) => user.id == state.userInfo.id,
        );
      }

      if (isMember) {
        commit('joinCabinError', 'Du er allerede medlem av denne hytta');
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
      if (data.updateCabin.cabin) commit('setCabinJoined');
    } else {
      commit(
        'joinCabinError',
        'Ingen hytte funnet. Sjekk at du har fått riktig hytte-id',
      );
    }
  },

  async fetchUserInfo({ commit }) {
    try {
      const { data } = await apolloClient.query({
        query: queries.userQuery,
        fetchPolicy: 'network-only',
      });
      commit('setUserInfo', data.self);
    } catch (error) {
      commit('signOut');
    }
  },
  async updateCabin({ commit }, data) {
    if (!data) return false;
    const response = await axios({
      method: 'put',
      url: `/cabins/${state.selectedCabin.id}`,
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
      data: data,
    });
    return response.data;
  },
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
    localStorage.setItem('token', token);
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
    localStorage.removeItem('token');
    state.successMessage = 'Du er logget ut!';
  },
  saved: (state, saved) => {
    state.saved = saved;
    setTimeout(() => {
      state.saved = false;
    }, 2000);
  },
  joinCabinError: (state, error) => (state.joinCabinError = error),
  setCabinJoined: (state) => (state.cabinJoined = true),
  toggleLoginModal: (state, show) => (state.loginModal = show),
  setSuccessMessage: (state, message) => (state.successMessage = message),
  toggleSideMenu: (state, show) => (state.sideMenu = show),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
