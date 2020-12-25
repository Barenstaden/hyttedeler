import { apolloClient } from "@/apollo";
import queries from "@/queries/content.js";

const state = {
  frontPageContent: null,
  frontPageAbout: null,
  loginPageContent: null
}

const getters = {
  frontPageContent: state => state.frontPageContent,
  frontPageAbout: state => state.frontPageAbout,
  loginPageContent: state => state.loginPageContent
}

const actions = {
  async fetchFrontPageContent( { commit }){
    const { data } = await apolloClient.query({query: queries.frontPageContentQuery})
    if(data.frontPage) commit('setFrontPageContent', data.frontPage)
  },
  async fetchFrontPageAbout( { commit }){
    const { data } = await apolloClient.query({query: queries.frontPageAboutQuery})
    if(data.frontPageAbout) commit('setFrontPageAbout', data.frontPageAbout)
  },
  async fetchLoginPageContent( { commit } ){
    const { data } = await apolloClient.query({query: queries.loginPageContentQuery});
    commit('setLoginBackground', data.login)
  }
}

const mutations = {
  setFrontPageContent: (state, content) => state.frontPageContent = content,
  setFrontPageAbout: (state, content) => state.frontPageAbout = content,
  setLoginBackground: (state, content) => state.loginPageContent = content
}

export default {
  state,
  getters,
  actions,
  mutations
}