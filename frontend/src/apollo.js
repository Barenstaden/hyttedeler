import Vue from "vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

export const apolloClient = new ApolloClient({
  uri: "/graphql",
  request: (operation) => {
    const token = localStorage.getItem("token")
      ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
      : "";
    operation.setContext({
      headers: token,
    });
  },
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo);

export default apolloProvider;
