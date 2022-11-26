import httpClient from "../../api/httpClient";

const state = {
  creditScore: [],
};

const getters = {
  getCreditScore: (state) => state.creditScore,
};

const actions = {
  async fetchCreditScore({ commit }) {
    try {
      const response = await httpClient.post(
        "/api/fundability/fields",
        {
          types: ["personal_credit_score"],
        },
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("SET_CREDIT_SCORE", response.data.result);
    } catch (error) {
      if (
        error.response &&
        (error.response.data.message === "Token has expired" ||
          error.response.status === 401)
      ) {
        commit(
          "auth/SET_AUTH_TOKEN",
          {
            loggedIn: false,
            AuthString: "",
            tokenExpired: true,
          },
          { root: true }
        );
      } else {
        commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
      }
    }
  },
  async sendCreditScore({ commit }, data) {
    try {
      const requiredData = {
        fields: data,
      };

      const response = await httpClient.put(
        "/api/fundability/fields",
        requiredData,
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("SET_CREDIT_SCORE", response.data.result);
    } catch (error) {
      if (
        error.response &&
        (error.response.data.message === "Token has expired" ||
          error.response.status === 401)
      ) {
        commit(
          "auth/SET_AUTH_TOKEN",
          {
            loggedIn: false,
            AuthString: "",
            tokenExpired: true,
          },
          { root: true }
        );
      } else {
        commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
      }
    }
  },
};

const mutations = {
  SET_CREDIT_SCORE(state, score) {
    state.creditScore = score;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
