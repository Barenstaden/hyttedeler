import { apolloClient } from '@/apollo';
import queries from '@/queries/user.js';
import axios from 'axios';
import router from '@/router';

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  userInfo: null,
  selectedCabin: null,
  successMessage: '',
  error: false,
  loginModal: false,
  sideMenu: false,
  newUser: true,
};

const getters = {
  token: (state) => state.token,
  userInfo: (state) => state.userInfo,
  selectedCabin: (state) => state.selectedCabin,
  successMessage: (state) => state.successMessage,
  error: (state) => state.error,
  loginModal: (state) => state.loginModal,
  sideMenu: (state) => state.sideMenu,
  newUser: (state) => state.newUser,
};

const actions = {
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
  async checkIfUserExists({ commit }, email) {
    const response = await axios.get('/api/check-if-user-exists', {
      params: {
        email: email,
      },
    });
    return response.data;
  },
  async login({ commit }, data) {
    try {
      const response = await axios.post('/auth/local', {
        identifier: data.email,
        password: data.password,
      });
      console.log(response);
      return response.data.jwt;
    } catch (error) {
      return error;
    }
  },
  async register({ commit }, data) {
    try {
      const response = await axios.post('/auth/local/register', {
        username: data.email,
        email: data.email,
        password: data.password,
        added_by: data.added_by ? data.added_by : null,
        change_password: data.change_password ? true : false,
      });
      console.log(response);
      return response.data.jwt;
    } catch (error) {
      return false;
    }
  },
  async update({ commit }, data) {
    if (!data || !data.data) return false;
    const stateData = (url) => {
      if (url == 'cabins') return 'selectedCabin';
      if (url == 'users') return 'userInfo';
    };
    const response = await axios({
      method: 'put',
      url: `/${data.url}/${state[stateData(data.url)].id}`,
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
      data: data.data,
    });
    return response.data;
  },
};

const mutations = {
  setToken: (state, token) => {
    localStorage.setItem('token', token);
    state.token = token;
  },
  loginError: (state, error) => (state.loginError = error),
  setUserInfo: (state, userInfo) => (state.userInfo = userInfo),
  setCabin: (state, cabin) => (state.selectedCabin = cabin),
  signOut: (state) => {
    Object.keys(state).forEach((key) => {
      if (state[key]) {
        state[key] = null;
      }
    });
    localStorage.removeItem('token');
    if (router.app._route.name != 'Hjem') router.push('/');
  },
  saved: (state, saved) => {
    state.saved = saved;
    setTimeout(() => {
      state.saved = false;
    }, 2000);
  },
  toggleLoginModal: (state, show) => (state.loginModal = show),
  setSuccessMessage: (state, message) => (state.successMessage = message),
  toggleSideMenu: (state, show) => (state.sideMenu = show),
  setNewUser: (state, val) => (state.newUser = val),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
