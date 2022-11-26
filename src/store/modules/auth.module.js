import httpClient from "../../api/httpClient";

const state = {
  email: "",
  pass: "",
  loggedIn: false,
  AuthString: "",
  authErrorMessage: "",
  tokenExpired: false,
};

const getters = {
  authString: (state) => state.AuthString,
  isLoggedIn: (state) => state.loggedIn,
  getEmail: (state) => state.email,
  getPass: (state) => state.pass,
};

const actions = {
  setEmail({ commit }, email) {
    commit("SET_USER_EMAIL", email);
  },
  setPass({ commit }, pass) {
    commit("SET_USER_PASS", pass);
  },
  async logIn({ commit, state }) {
    try {
      const authData = {
        email: state.email,
        password: state.pass,
      };
      const response = await httpClient.post(
        `/api/fundability/authenticate`,
        authData
      );
      commit("SET_AUTH_TOKEN", {
        loggedIn: true,
        AuthString: response.data.result.token,
      });
    } catch (error) {
      commit("SET_AUTH_ERROR_MESSAGE", error.message);
    }
  },
};

const mutations = {
  SET_USER_EMAIL(state, email) {
    state.email = email;
  },
  SET_USER_PASS(state, pass) {
    state.pass = pass;
  },
  SET_AUTH_TOKEN(state, data) {
    state.AuthString = `Bearer ${data.AuthString}`;
    state.loggedIn = data.loggedIn;
    state.tokenExpired = data.tokenExpired;
  },
  SET_AUTH_ERROR_MESSAGE(state, msg) {
    state.authErrorMessage = msg;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
